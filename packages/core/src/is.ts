import type, { SpecType } from "./type";
import { Narrow } from "./utils";

/**
 * Returns if `value` matches the schema.
 *
 * @example
 * let value: unknown;
 * if (is(value, { prop: string })) {
 *  // TS knows the corresponding type in this block
 *  value.prop;
 * }
 */
export default function is<S>(
  value: unknown,
  spec: Narrow<S>
): value is SpecType<S> {
  return type(spec).is(value);
}
