import schema from "./schema";

/**
 * Validates type of value is `number` and is not `NaN`.
 *
 * If `Nan` should be accepted use `union(number, NaN)`.
 * To check only for `NaN` use `literal(NaN)`.
 */
const number = schema<number>(
  "number",
  (v) => typeof v === "number" && v === v
);

export default number;
