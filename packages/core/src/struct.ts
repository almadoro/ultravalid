import StructSchema, { StructStaticEntry } from "./StructSchema";
import type, { Spec, SpecType } from "./type";
import { ExpandRecursively, Narrow, UnionToIntersection } from "./utils";

/**
 * Validates value is an object with the specified properties and corresponding
 * types. This validation is `type` parseable.
 *
 * - **Optional properties** can be specified appending `?` to the end of the
 * name.
 * - If extra enumerable properties are found the validation will not
 * succeed.
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
export default function struct<S extends StructSpec>(
  spec: Narrow<S>
): StructSchema<StructSpecType<S>> {
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

  return new StructSchema<any>("struct", {
    staticEntries,
    staticOptionalEntries,
  });
}

export interface StructSpec {
  [K: string]: Spec;
}

export type StructSpecType<S extends StructSpec> = ExpandRecursively<
  UnionToIntersection<TransformOptionals<S>>
>;

export type TransformOptionals<S extends StructSpec> = {
  [K in keyof S]: K extends `${infer T}?`
    ? { [_ in T]+?: SpecType<S[K]> }
    : { [_ in K]: SpecType<S[K]> };
}[keyof S];

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
