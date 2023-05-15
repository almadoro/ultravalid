import { AttemptOptions } from "./schema";
import type, { SpecType } from "./type";

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
export default function is<const S>(
  value: unknown,
  spec: S,
  options?: AttemptOptions
): value is SpecType<S> {
  return type(spec).is(value, options);
}
