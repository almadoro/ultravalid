import { AttemptOptions } from "./schema";
import type, { SpecType } from "./type";

/**
 * Asserts `value` matches the schema. In case of a failure a
 * `ValidationError` will be thrown.
 *
 * @example
 * let value: unknown;
 * assert(value, { prop: string });
 * // Following code only executes if validation succeeds and value
 * // will be typed.
 * value.prop;
 */
export default function assert<const S>(
  value: unknown,
  spec: S,
  options?: AttemptOptions
): asserts value is SpecType<S> {
  return type(spec).assert(value, options);
}
