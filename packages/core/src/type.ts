import instance, { InstanceMetadata, InstanceSpec } from "./instance";
import literal, { LiteralMetadata, LiteralSpec } from "./literal";
import { Schema } from "./schema";
import struct, { StructMetadata, StructSpec, StructSpecType } from "./struct";
import tuple, { TupleMetadata, TupleSpec, TupleSpecType } from "./tuple";
import { fmt } from "./utils";

/**
 * Shorthand for creating schemas. Objects will be parsed like `struct`, arrays
 * like `tuple`, functions like classes constructors (`instance`) and
 * everything else like a `literal`.
 *
 * @example
 * type({ id: string }) // Same as "struct({ id: string })"
 * type([number, string]) // Same as "tuple(number, string)"
 * type(Date) // Same as "instance(Date)"
 * type(2); // Same as "literal(2)"
 */
export default function type<const S>(
  spec: S
): Schema<SpecType<S>, SpecMetadata<S>> {
  switch (typeof spec) {
    case "object":
      if (spec instanceof Schema) return spec;
      if (Array.isArray(spec)) return tuple(...spec) as Schema<any, any>;
      if (spec !== null) return struct<any>(spec) as Schema<any, any>;
      return literal(null) as Schema<any, any>;
    case "symbol":
    case "string":
    case "number":
    case "bigint":
    case "boolean":
    case "undefined":
      return literal(spec) as Schema<any, any>;
    case "function":
      return instance<any>(spec) as Schema<any, any>;
    default:
      throw new Error(fmt`Invalid schema spec "${spec}"`);
  }
}

/**
 * Returns equivalent type to specified Spec.
 */
export type SpecType<S> = S extends Schema<infer T, infer _>
  ? T
  : S extends InstanceSpec
  ? InstanceType<S>
  : S extends LiteralSpec
  ? S
  : S extends TupleSpec
  ? TupleSpecType<S>
  : S extends StructSpec
  ? StructSpecType<S>
  : never;

/**
 * Returns equivalent metadata to specified Spec.
 */
export type SpecMetadata<S> = S extends Schema<infer _, infer M>
  ? M
  : S extends InstanceSpec
  ? InstanceMetadata<S>
  : S extends LiteralSpec
  ? LiteralMetadata<S>
  : S extends TupleSpec
  ? TupleMetadata
  : S extends StructSpec
  ? StructMetadata
  : never;
