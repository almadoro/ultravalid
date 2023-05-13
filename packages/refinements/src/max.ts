import { refinement } from "@almadoro/uv-core";

/**
 * Validates that the value is less than or equal to the specified.
 *
 * @example
 * number.refine(max(2));
 */
export default function max(spec: number) {
  return refinement<number>(
    "max",
    (v) => v <= spec || `Expected "${v}" to be at most ${spec}`
  );
}
