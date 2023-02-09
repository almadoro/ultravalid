import schema from "./schema";

/**
 * Validates typeof value is `string`.
 */
const string = schema<string>("string", (v) => typeof v === "string");

export default string;
