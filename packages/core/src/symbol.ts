import schema from "./schema";

/**
 * Validates type of value is `symbol`.
 */
const symbol = schema<symbol>("symbol", (v) => typeof v === "symbol");

export default symbol;
