import never from "./never";
import { Schema } from "./schema";
import type, { Spec, SpecType } from "./type";
import { fmt, Narrow } from "./utils";
import ValidationError from "./ValidationError";

/**
 * Validates an array of fixed length and schema for each entry. This
 * validation is `type` parseable.
 *
 * @example
 * tuple(string, number, number)
 * type([string, number]) // Same as "tuple(string, number)"
 */
export default function tuple<S extends Spec[]>(
  ...spec: Narrow<S>
): Schema<TupleSpecType<S>> {
  const entries: Schema<unknown>[] = [];
  for (let i = 0; i < spec.length; i++) {
    entries.push(type<any>(spec[i]));
  }

  return new Schema<any>("tuple", function* (
    this: Schema<unknown[]>,
    inputValue,
    ctx
  ) {
    if (!Array.isArray(inputValue)) {
      yield [
        null,
        new ValidationError(
          fmt`Expected a tuple but received "${inputValue}"`,
          inputValue,
          this
        ),
      ];
      return;
    }

    const value: unknown[] = [];
    for (let i = 0; i < entries.length; i++) {
      const key = i.toString();
      const inputItemValue = inputValue[i];
      const schema = entries[i];
      const result = schema.evaluate(inputItemValue, {
        ...ctx,
        key,
        parentHasOwnProperty: true,
      });
      for (const [itemValue, error] of result) {
        if (error) yield [null, error.addEntry(key, inputValue, this)];
        else value[i] = itemValue;
      }
    }

    for (let i = entries.length; i < inputValue.length; i++) {
      const key = i.toString();
      const inputItemValue = inputValue[i];
      const result = never.evaluate(inputItemValue, {
        ...ctx,
        key,
        parentHasOwnProperty: true,
      });
      for (const [, error] of result) {
        if (error) yield [null, error.addEntry(key, inputValue, this)];
      }
    }

    yield [value, null];
  });
}

export interface TupleSpec extends Array<Spec> {}

export type TupleSpecType<S extends TupleSpec> = {
  [K in keyof S]: S[K] extends Function ? S[K] : SpecType<S[K]>;
};
