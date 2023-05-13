import { refinement } from "@almadoro/uv-core";

/**
 * Validates string satisfies uuid format.
 *
 * @example
 * string.refine(uuid);
 */
const uuid = refinement<string>(
  "uuid",
  (v) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(v) ||
    `Expected an uuid instead received "${v}"`
);

export default uuid;
