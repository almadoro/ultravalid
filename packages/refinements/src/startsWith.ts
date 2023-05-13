import { fmt, refinement } from "@almadoro/uv-core";

/**
 * Validates that strings starts with the specified value.
 *
 * @example
 * string.refine(startsWith("foo"));
 */
export default function startsWith(spec: string) {
  return refinement<string>(
    "startsWith",
    (v) => v.startsWith(spec) || fmt`Expected "${v}" to start with "${spec}"`
  );
}
