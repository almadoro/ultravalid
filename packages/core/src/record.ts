import { Schema } from "./schema";
import StructSchema, { StructKey } from "./StructSchema";
import type, { Spec, SpecType } from "./type";
import { Narrow } from "./utils";

export default function record<
  S extends Record<SpecType<K>, V>,
  K extends StructKey | Schema<StructKey>,
  V extends Spec
>(key: K, value: Narrow<V>): StructSchema<S> {
  return new StructSchema("record", {
    dynamicEntries: [[type<any>(key), type(value)]],
  });
}
