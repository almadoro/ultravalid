import { refinement } from "@almadoro/uv-core";

/**
 * Validates that the value is greater than or equal to the specified.
 *
 * @example
 * number.refine(min(1));
 */
export default function min(spec: number) {
  return refinement<number>(
    "min",
    (v) => v >= spec || `Expected "${v}" to be at least ${spec}`
  );
}
