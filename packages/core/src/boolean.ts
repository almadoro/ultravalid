import schema from "./schema";

/**
 * Validates type of value is `boolean`.
 */
const boolean = schema<boolean>("boolean", (v) => typeof v === "boolean");

export default boolean;
