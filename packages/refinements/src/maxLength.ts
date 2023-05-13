import { fmt, refinement } from "@almadoro/uv-core";

/**
 * Validates that the `length` property of the value is less than or equals
 * to the specified.
 *
 * @example
 * array(any).refine(maxLength(3));
 */
export default function maxLength(spec: number) {
  return refinement<string | any[]>(
    "maxLength",
    (v) =>
      v.length <= spec ||
      fmt`Expected length of "${v}" to be at most ${spec} but instead it is ${v.length}`
  );
}
