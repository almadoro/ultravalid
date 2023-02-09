import type, { Spec, SpecType } from "./type";
import { Narrow } from "./utils";

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
export default function assert<S extends Spec>(
  value: unknown,
  spec: Narrow<S>
): asserts value is SpecType<S> {
  return type(spec).assert(value);
}
