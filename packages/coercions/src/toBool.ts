import { coercion, unknown } from "@almadoro/uv-core";

/**
 * Apply the `Boolean()` constructor to the value.
 *
 * @example
 * boolean.coerce(toBool);
 */
const toBool = coercion(unknown, (v) => Boolean(v));

export default toBool;
