import { refinement } from "@almadoro/uv-core";

/**
 * Validates that the value satisfies the specified regex. Every time a value
 * is tested a copy of the regex will be used.
 *
 * @example
 * string.refine(regex(/^www\..+/));
 */
export default function regex(spec: RegExp) {
  return refinement<string>(
    "regex",
    (v) =>
      new RegExp(spec).test(v) ||
      `Expected "${v}" to satisfy the pattern "${spec.toString()}"`
  );
}
