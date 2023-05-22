import any from "./any";
import literal from "./literal";
import never from "./never";
import object from "./object";
import { Schema, TypeCheckGenFn } from "./schema";
import type, { SpecType } from "./type";
import union from "./union";
import {
  ExpandRecursively,
  fmt,
  UnionToIntersection,
  Writeable,
} from "./utils";
import ValidationError from "./ValidationError";

/**
 * Validates value is an object with the specified properties and corresponding
 * types.
 *
 * This validation is `type` parseable.
 *
 * **Optional properties** can be specified appending `?` to the end of the
 * name.
 *
 * If extra enumerable properties are found and `unknownKeys` option is:
 *
 * - `error` (default): the validation will not succeed.
 * - `ignore`: the keys will be ignored and will not be present on value.
 * - `keep`: the keys will be added without being validated, althought they
 * will not be reflected on type.
 *
 * @example
 * struct({
 *  id: number,
 *  "name?": string, // This property will match `name` and be optional
 * })
 *
 * // Same as previous schema
 * type({
 *  id: number,
 *  "name?": string,
 * })
 */
export default function struct<const S extends StructSpec>(spec: S) {
  const staticEntries: StructStaticEntry[] = [];
  const staticOptionalEntries: StructStaticEntry[] = [];

  for (const key in spec) {
    // properties ending with `?` should be treated as optionals
    if (key.endsWith("?"))
      staticOptionalEntries.push([
        key.substring(0, key.length - 1),
        type<any>(spec[key]),
      ]);
    else staticEntries.push([key, type<any>(spec[key])]);
  }

  return new Schema<StructSpecType<S>, StructMetadata>(
    "struct",
    {
      staticEntries,
      staticOptionalEntries,
      dynamicEntries: [],
    },
    strutcTypeCheck
  );
}

export const strutcTypeCheck: TypeCheckGenFn<
  any,
  Schema<any, StructMetadata>
> = function* (inputValue, ctx) {
  if (!object.is(inputValue)) {
    yield [
      null,
      new ValidationError(
        fmt`Expected a "struct" but received "${inputValue}"`,
        inputValue,
        ctx.schema
      ),
    ];
    return;
  }

  const unknownKeys = new Set(Object.keys(inputValue));
  const value: Record<string, unknown> = Object.create(null);

  for (const [key, schema] of ctx.schema.metadata.staticEntries) {
    const inputEntryValue = (inputValue as Record<string, unknown>)[key];
    const parentHasOwnProperty = inputValue.hasOwnProperty(key);
    const [entryValue, entryError] = schema._attempt(inputEntryValue, {
      options: ctx.options,
      key,
      parentHasOwnProperty,
    });
    if (entryError)
      yield [null, entryError.addEntry(key, inputValue, ctx.schema)];
    else if (parentHasOwnProperty) value[key] = entryValue;
    unknownKeys.delete(key);
  }

  for (const [key, schema] of ctx.schema.metadata.staticOptionalEntries) {
    const inputEntryValue = (inputValue as Record<string, unknown>)[key];
    const parentHasOwnProperty = inputValue.hasOwnProperty(key);
    const [entryValue, entryError] = union(
      schema,
      Schema.config.exactOptionalPropertyTypes ? never : literal(undefined)
    )._attempt(inputEntryValue, {
      options: ctx.options,
      key,
      parentHasOwnProperty,
    });
    if (entryError)
      yield [null, entryError.addEntry(key, inputValue, ctx.schema)];
    else if (parentHasOwnProperty) value[key] = entryValue;
    unknownKeys.delete(key);
  }

  const allKeys = new Set(Object.keys(inputValue));

  for (const [keySchema, valueSchema] of ctx.schema.metadata.dynamicEntries) {
    for (const key of allKeys) {
      if (!keySchema.is(key)) continue;
      const inputEntryValue = (inputValue as Record<string, unknown>)[key];
      const [entryValue, entryError] = valueSchema._attempt(inputEntryValue, {
        options: ctx.options,
        key,
        parentHasOwnProperty: true,
      });
      if (entryError)
        yield [null, entryError.addEntry(key, inputValue, ctx.schema)];
      else value[key] = entryValue;
      unknownKeys.delete(key);
    }
  }

  if (ctx.options.unknownKeys === "keep" || ctx.options.unknownKeys === "error")
    for (const key of unknownKeys) {
      const inputEntryValue = (inputValue as Record<string, unknown>)[key];
      const [entryValue, entryError] = (
        ctx.options.unknownKeys === "keep" ? any : never
      )._attempt(inputEntryValue, {
        options: ctx.options,
        key,
        parentHasOwnProperty: true,
      });
      if (entryError)
        yield [null, entryError.addEntry(key, inputValue, ctx.schema)];
      else value[key] = entryValue;
    }

  yield [value as any, null];
};

export type StructKey = string;
export interface StructSpec {
  [K: StructKey]: any;
}

export type StructSpecType<S extends StructSpec> = ExpandRecursively<
  UnionToIntersection<TransformOptionals<Writeable<S>>>
>;

export interface StructMetadata {
  staticEntries: StructStaticEntry[];
  dynamicEntries: StructDynamicEntry[];
  staticOptionalEntries: StructStaticEntry[];
}

export type TransformOptionals<S extends StructSpec> = {
  [K in keyof S]: K extends `${infer T}?`
    ? { [_ in T]+?: SpecType<S[K]> }
    : { [_ in K]: SpecType<S[K]> };
}[keyof S];

export type StructStaticEntry = [key: StructKey, schema: Schema<any, any>];
export type StructDynamicEntry = [
  key: Schema<StructKey, any>,
  schema: Schema<any, any>
];

/**
 * TODO: string key symbol functionality
 * const StringKey = Symbol();
 *
 * export type StringKeySymbol = typeof StringKey;
 *
 * struct.key = {
 *   string: StringKey,
 * } as const;
 *
 * export const key = {
 *   string: StringKey,
 * } as const;
 *
 * export interface StructSpec {
 *   [K: string]: Spec;
 *   [StringKey]?: Spec;
 * }
 *
 * export type StructSpecType<S extends StructSpec> = ExpandRecursively<
 *   UnionToIntersection<TransformOptionals<S>>
 * >;
 *
 * export type TransformOptionals<S extends StructSpec> = {
 *   [K in keyof S]: K extends StringKeySymbol
 *     ? { [K: string]: SpecType<S[K]> }
 *     : K extends `${infer T}?`
 *     ? { [_ in T]+?: SpecType<S[K]> }
 *     : { [_ in K]: SpecType<S[K]> };
 * }[keyof S];
 */
