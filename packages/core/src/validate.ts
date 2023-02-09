import type, { Spec, SpecType } from "./type";
import { Narrow } from "./utils";
import ValidationError from "./ValidationError";

/**
 * Returns validation result object containing:
 *
 * - `value`: in case of success a value that matches the schema. Otherwise
 * `null`.
 * - `error`: in case of failure a `ValidationError` instance. Otherwise
 * `null`.
 *
 * @example
 * let inputValue: unknown;
 * const { value, error } = validate(inputValue, { prop: string });
 * if (error) {
 *  // Here TS understands value is null and error a
 *  // `ValidationError` instance.
 * } else {
 *  // Here value has schema's corresponding type
 *  value.prop;
 * }
 */
export default function validate<S extends Spec>(
  value: unknown,
  spec: Narrow<S>
):
  | { value: SpecType<S>; error: null }
  | { value: null; error: ValidationError } {
  return type(spec).validate(value);
}
