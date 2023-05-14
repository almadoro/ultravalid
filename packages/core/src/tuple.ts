import never from "./never";
import { Schema, TypeCheckGenFn } from "./schema";
import type, { SpecType } from "./type";
import { fmt } from "./utils";
import ValidationError from "./ValidationError";

/**
 * Validates an array of fixed length and schema for each entry. This
 * validation is `type` parseable.
 *
 * @example
 * tuple(string, number, number)
 * type([string, number]) // Same as "tuple(string, number)"
 */
export default function tuple<const S extends readonly any[]>(
  ...spec: S
): Schema<TupleSpecType<S>, TupleMetadata> {
  const itemSchemas: Schema<any, any>[] = [];
  for (let i = 0; i < spec.length; i++) {
    itemSchemas.push(type(spec[i]));
  }

  return new Schema<TupleSpecType<S>, TupleMetadata>(
    "tuple",
    { itemSchemas },
    tupleTypeCheck
  );
}

const tupleTypeCheck: TypeCheckGenFn<
  any,
  Schema<any, TupleMetadata>
> = function* (inputValue, ctx) {
  if (!Array.isArray(inputValue)) {
    yield [
      null,
      new ValidationError(
        fmt`Expected a tuple but received "${inputValue}"`,
        inputValue,
        ctx.schema
      ),
    ];
    return;
  }

  const value: unknown[] = [];
  const itemSchemas = ctx.schema.metadata.itemSchemas;
  for (let i = 0; i < ctx.schema.metadata.itemSchemas.length; i++) {
    const key = i.toString();
    const inputItemValue = inputValue[i];
    const schema = itemSchemas[i];
    const [entryValue, entryError] = schema._attempt(inputItemValue, {
      options: ctx.options,
      key,
      parentHasOwnProperty: true,
    });
    if (entryError)
      yield [null, entryError.addEntry(key, inputValue, ctx.schema)];
    else value[i] = entryValue;
  }

  for (let i = itemSchemas.length; i < inputValue.length; i++) {
    const key = i.toString();
    const inputItemValue = inputValue[i];
    const [entryValue, entryError] = never._attempt(inputItemValue, {
      options: ctx.options,
      key,
      parentHasOwnProperty: true,
    });
    if (entryError)
      yield [null, entryError.addEntry(key, inputValue, ctx.schema)];
  }

  yield [value, null];
};

export interface TupleSpec extends ReadonlyArray<any> {}

export type TupleSpecType<S extends TupleSpec> = {
  -readonly [K in keyof S]: S[K] extends Function ? S[K] : SpecType<S[K]>;
};

export interface TupleMetadata {
  itemSchemas: Schema<any, any>[];
}
