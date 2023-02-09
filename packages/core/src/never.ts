import schema from "./schema";
import { fmt } from "./utils";

/**
 * Validates value is `undefined` and the entry does not exists on parent
 * object.
 */
export const never = schema<never>(
  "never",
  (value, { parentHasOwnProperty, key }) =>
    (value === undefined && parentHasOwnProperty === false) || key
      ? fmt`Expected key "${key}" not to exists but received "${value}"`
      : fmt`Expected value not to exists but received "${value}"`
);

export default never;
