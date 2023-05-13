import { Schema, TypeCheckGenFn } from "./schema";
import type, { Spec, SpecType } from "./type";
import { fmt, Narrow } from "./utils";
import ValidationError from "./ValidationError";

/**
 * Validates an Array with elements of specified schema.
 *
 * @example
 * array(string)
 * array({ id: string, age: number })
 */
export default function array<S extends Spec>(spec: Narrow<S>) {
  return new Schema<SpecType<S>[], ArrayMetadata<Schema<SpecType<S>, any>>>(
    "array",
    { itemSchema: type<any>(spec) },
    arrayTypeCheck
  );
}

export const arrayTypeCheck: TypeCheckGenFn<
  any[],
  Schema<any[], ArrayMetadata<Schema<any, any>>>
> = function* (inputValue, ctx) {
  if (!Array.isArray(inputValue)) {
    yield [
      null,
      new ValidationError(
        fmt`Expected an array but received "${inputValue}"`,
        inputValue,
        ctx.schema
      ),
    ];
    return;
  }

  const value: any[] = [];
  for (let i = 0; i < inputValue.length; i++) {
    const key = i.toString();
    const inputItemValue = inputValue[i];
    const [entryValue, entryError] = ctx.schema.metadata.itemSchema._attempt(
      inputItemValue,
      {
        options: ctx.options,
        key,
        parentHasOwnProperty: true,
      }
    );

    if (entryError)
      yield [null, entryError.addEntry(key, inputValue, ctx.schema)];
    else value[i] = entryValue;
  }

  yield [value, null];
};

export interface ArrayMetadata<IS extends Schema<any, any>> {
  itemSchema: IS;
}
