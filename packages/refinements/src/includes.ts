import { fmt, refinement } from "@almadoro/uv-core";

/**
 * Validates that the array or string contains the specified item or string
 * respectively.
 *
 * @example
 * string.refine(includes("foo"));
 */
export default function includes(spec: any) {
  return refinement<string | any[]>(
    "includes",
    (v) => v.includes(spec) || fmt`Expected "${v}" to include "${spec}"`
  );
}
