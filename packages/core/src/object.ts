import schema from "./schema";

/**
 * Validates type of value is `object` and is not `null`.
 *
 * If null should be accepted use `union(object, null)`.
 * To check only for `null` use `literal(null)`.
 */
const object = schema<object>(
  "object",
  (v) => typeof v === "object" && v !== null
);

export default object;
