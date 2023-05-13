import { coercion, number, string, union } from "@almadoro/uv-core";

/**
 * Apply the `Date()` constructor to the value.
 *
 * @example
 * instance(Date).coerce(toDate);
 */
const toDate = coercion(union(string, number, Date), (v) => new Date(v));

export default toDate;
