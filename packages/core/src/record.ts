import { Schema } from "./schema";
import { StructKey, StructMetadata, strutcTypeCheck } from "./struct";
import type, { Spec, SpecType } from "./type";
import { Narrow } from "./utils";

export default function record<
  S extends Record<SpecType<K>, SpecType<V>>,
  K extends StructKey | Schema<StructKey, any>,
  V extends Spec
>(key: Narrow<K>, value: Narrow<V>): Schema<S, StructMetadata> {
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
