import { refinement } from "@almadoro/uv-core";

/**
 * Validates that the `Date` instance is one with a valid value.
 *
 * @example
 * instance(Date).refine(validDate);
 */
const validDate = refinement<Date>(
  "validDate",
  (v) => !Number.isNaN(v.getTime()) || "Expected a valid date"
);

export default validDate;
