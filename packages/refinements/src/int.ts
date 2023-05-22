import { fmt, refinement } from "@almadoro/uv-core";

/**
 * Validates number is an integer.
 *
 * @example
 * number.refine(int);
 */
const int = refinement<number>(
  "int",
  (v) => Number.isInteger(v) || fmt`Expected an integer but received "${v}"`
);

export default int;
