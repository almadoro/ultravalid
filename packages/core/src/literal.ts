import { Schema, TypeCheckGenFn } from "./schema";
import { fmt } from "./utils";
import ValidationError from "./ValidationError";

/**
 * Validates value against a constant using `Object.is`. Accepted constants
 * types are string, number (including NaN), bigint, symbol, boolean, null
 * and undefined. This validation is `type` parseable.
 *
 * @example
 * literal(42);
 * type(null); // Same as "literal(null)"
 */
export default function literal<V extends LiteralSpec>(spec: V) {
  return new Schema<V, LiteralMetadata<V>>(
    "literal",
    { value: spec },
    literalTypeCheck
  );
}

export const literalTypeCheck: TypeCheckGenFn<
  any,
  Schema<any, LiteralMetadata<any>>
> = function* (inputValue, ctx) {
  const result = Object.is(inputValue, ctx.schema.metadata.value);
  if (result) yield [inputValue, null];
  else {
    const message = fmt`Expected value "${ctx.schema.metadata.value}" but received "${inputValue}"`;
    yield [null, new ValidationError(message, inputValue, ctx.schema)];
  }
};

export type LiteralSpec =
  | string
  | number
  | bigint
  | symbol
  | boolean
  | null
  | undefined;

export type LiteralMetadata<V extends LiteralSpec> = {
  value: V;
};
