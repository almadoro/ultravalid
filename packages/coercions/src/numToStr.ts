import { coercion, number } from "@almadoro/uv-core";

/**
 * Use the `toString()` method to convert the value.
 *
 * @example
 * string.coerce(numToStr);
 */
const numToStr = coercion(number, (v) => v.toString());

export default numToStr;
