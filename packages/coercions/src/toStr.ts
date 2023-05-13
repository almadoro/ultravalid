import { coercion, unknown } from "@almadoro/uv-core";

/**
 * Apply the `String()` constructor to the value.
 *
 * @example
 * string.coerce(toStr);
 */
const toStr = coercion(unknown, (v) => String(v));

export default toStr;
