import { fmt, refinement } from "@almadoro/uv-core";

/**
 * Validates that strings ends with the specified value.
 *
 * @example
 * string.refine(endsWith("foo"));
 */
export default function endsWith(spec: string) {
  return refinement<string>(
    "endsWith",
    (v) => v.endsWith(spec) || fmt`Expected "${v}" to end with "${spec}"`
  );
}
