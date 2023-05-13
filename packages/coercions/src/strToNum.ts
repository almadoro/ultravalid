import { coercion, string } from "@almadoro/uv-core";

/**
 * Apply the `parseFloat()` function to the value.
 *
 * @example
 * number.coerce(strToNum);
 */
const strToNum = coercion(string, (v) => parseFloat(v));

export default strToNum;
