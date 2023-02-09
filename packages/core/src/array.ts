import { Schema } from "./schema";
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
export default function array<S extends Spec>(
  spec: Narrow<S>
): Schema<SpecType<S>[]> {
  const itemSchema = type(spec as any);

  return new Schema<any>("array", function* (
    this: Schema<unknown[]>,
    inputValue,
    ctx
  ) {
    if (!Array.isArray(inputValue)) {
      yield [
        null,
        new ValidationError(
          fmt`Expected an array but received "${inputValue}"`,
          inputValue,
          this
        ),
      ];
      return;
    }

    const value: unknown[] = [];
    for (let i = 0; i < inputValue.length; i++) {
      const key = i.toString();
      const inputItemValue = inputValue[i];
      const result = itemSchema.evaluate(inputItemValue, {
        ...ctx,
        key,
        parentHasOwnProperty: true,
      });

      for (const [itemValue, error] of result) {
        if (error) yield [null, error.addEntry(key, inputValue, this)];
        else value[i] = itemValue;
      }
    }

    yield [value, null];
  });
}
