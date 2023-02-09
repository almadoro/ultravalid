import schema from "./schema";

/**
 * Accepts any value as valid and equivalent typescript type is `any`.
 */
const any = schema<any>("any", () => true);

export default any;
