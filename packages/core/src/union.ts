import { Schema } from "./schema";
import type, { Spec, SpecType } from "./type";
import { ArrayElement, fmt, Narrow } from "./utils";
import ValidationError from "./ValidationError";

/**
 * Validates the value satisfies one of the schemas.
 *
 * @example
 * union("Point2D", number, number);
 * type([number, string]); // Same as "union(number, string)"
 */
export default function union<S extends Spec[]>(
  ...specs: Narrow<S>
): Schema<SpecType<ArrayElement<S>>> {
  const unionTypes = specs.map((spec) => type(spec as Schema<unknown>));
  const unionTypesStr = unionTypes
    .map((validation) => validation.name)
    .join(" | ");

  return new Schema<any>("union", function* (this: Schema<any>, inputValue) {
    for (const type of unionTypes) {
      const { value, error } = type.validate(inputValue);
      if (error) continue;
      yield [value, null];
      return;
    }
    yield [
      null,
      new ValidationError(
        fmt`Expected value to satisfy union of "${unionTypesStr}" but received ${inputValue}`,
        inputValue,
        this
      ),
    ];
  });
}
