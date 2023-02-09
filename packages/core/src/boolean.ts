import schema from "./schema";

/**
 * Validates typeof value is `boolean`.
 */
const boolean = schema<boolean>("boolean", (v) => typeof v === "boolean");

export default boolean;
