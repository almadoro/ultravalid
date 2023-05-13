import schema from "./schema";

/**
 * Validates type of value is `string`.
 */
const string = schema<string>("string", (v) => typeof v === "string");

export default string;
