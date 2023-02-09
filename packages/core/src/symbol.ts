import schema from "./schema";

/**
 * Validates typeof value is `symbol`.
 */
const symbol = schema<symbol>("symbol", (v) => typeof v === "symbol");

export default symbol;
