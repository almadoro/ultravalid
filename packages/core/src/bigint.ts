import schema from "./schema";

/**
 * Validates type of value is `bigint`.
 */
const bigint = schema<bigint>("bigint", (v) => typeof v === "bigint");

export default bigint;
