import schema, { Schema } from "./schema";

/**
 * Validates value against a constant using `Object.is`. Accepted constants
 * types are string, number (including NaN), bigint, symbol, boolean, null
 * and undefined. This validation is `type` parseable.
 *
 * @example
 * literal(42);
 * type(null); // Same as "type(null)""
 */
export default function literal<V extends LiteralSpec>(spec: V): Schema<V> {
  return schema("literal", (v) => Object.is(v, spec));
}

export type LiteralSpec =
  | string
  | number
  | bigint
  | symbol
  | boolean
  | null
  | undefined;
