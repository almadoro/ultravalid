import schema from "./schema";

/**
 * Accepts any value as valid and equivalent typescript type is `unknown`.
 */
const unknown = schema<unknown>("unknown", () => true);

export default unknown;
