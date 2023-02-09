import instance, { InstanceSpec } from "./instance";
import literal, { LiteralSpec } from "./literal";
import { Schema } from "./schema";
import struct, { StructSpec, StructSpecType } from "./struct";
import tuple, { TupleSpec, TupleSpecType } from "./tuple";
import { Narrow } from "./utils";

/**
 * Shorthand for creating schemas. Objects will be parsed like `struct`, arrays
 * like `tuple`, functions like classes constructors (`instance`) and
 * everything else like a `literal`.
 *
 * @example
 * type({ id: string }) // Same as "struct({ id: string })"
 * type([number, string]) // Same as "tuple(number, string)"
 * type(Date) // Same as "instance(Date)"
 * type(number); // Same as "literal(number)"
 */
export default function type<S extends Spec>(
  spec: Narrow<S>
): Schema<SpecType<S>> {
  switch (typeof spec) {
    case "object":
      if (spec instanceof Schema) return spec;
      if (Array.isArray(spec)) return tuple(...spec) as Schema<any>;
      if (spec !== null) return struct(spec) as Schema<any>;
      return literal<any>(null);
    case "symbol":
    case "string":
    case "number":
    case "bigint":
    case "boolean":
    case "undefined":
      return literal<any>(spec);
    case "function":
      return instance(spec as any);
  }
}

/**
 * Represents all of the `type` parseable specs.
 */
export type Spec =
  | TupleSpec
  | StructSpec
  | Schema<unknown>
  | InstanceSpec<unknown>
  | LiteralSpec;

/**
 * Returns equivalent type to specified Spec.
 */
export type SpecType<S> = S extends Schema<infer T>
  ? T
  : S extends InstanceSpec<infer T>
  ? T
  : S extends LiteralSpec
  ? S
  : S extends TupleSpec
  ? TupleSpecType<S>
  : S extends StructSpec
  ? StructSpecType<S>
  : never;
