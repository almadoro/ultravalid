import { refinement } from "@almadoro/uv-core";

/**
 * Validates string satifies email regex.
 *
 * @link https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
 *
 * @example
 * string.refine(email);
 */
const email = refinement<string>(
  "email",
  (v) =>
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      v
    ) || `Expected an email but instead received "${v}"`
);

export default email;
