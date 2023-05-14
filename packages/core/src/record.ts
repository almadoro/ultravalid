import { Schema } from "./schema";
import { StructKey, StructMetadata, strutcTypeCheck } from "./struct";
import type, { SpecType } from "./type";

export default function record<
  S extends Record<SpecType<K>, SpecType<V>>,
  const K extends StructKey | Schema<StructKey, any>,
  const V
>(key: K, value: V): Schema<S, StructMetadata> {
  return new Schema(
    "record",
    {
      staticEntries: [],
      staticOptionalEntries: [],
      dynamicEntries: [[type<any>(key), type(value)]],
    },
    strutcTypeCheck
  );
}
