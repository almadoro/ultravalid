import { fmt, refinement } from "@almadoro/uv-core";

/**
 * Validates that the `length` property of the value is greater than or equals
 * to the specified.
 *
 * @example
 * string.refine(minLength(2));
 */
export default function minLength(spec: number) {
  return refinement<string | Array<any>>(
    "minLength",
    (v) =>
      v.length >= spec ||
      fmt`Expected length of "${v}" to be at least ${spec} but instead it is ${v.length}`
  );
}
