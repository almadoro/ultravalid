import { coercion, unknown } from "@almadoro/uv-core";

/**
 * Apply the `Number()` constructor to the value.

 * @example
 * number.coerce(toNum);
 */
const toNum = coercion(unknown, (v) => Number(v));

export default toNum;
