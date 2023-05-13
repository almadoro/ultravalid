import { fmt, refinement } from "@almadoro/uv-core";

/**
 * Validates that the `length` property of the value is equals to the
 * specified.
 *
 * @example
 * string.refine(length(8));
 */
export default function length(spec: number) {
  return refinement<string | Array<any>>(
    "length",
    (v) =>
      v.length === spec ||
      fmt`Expected length of "${v}" to be ${spec} but instead it is ${v.length}`
  );
}
