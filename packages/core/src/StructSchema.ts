import any from "./any";
import literal from "./literal";
import never from "./never";
import object from "./object";
import { Schema } from "./schema";
import union from "./union";
import { fmt } from "./utils";
import ValidationError from "./ValidationError";

export default class StructSchema<T> extends Schema<T> {
  public static exactOptionalPropertyTypes = false;
  public readonly staticEntries: StructStaticEntry[];
  public readonly dynamicEntries: StructDynamicEntry[];
  public readonly staticOptionalEntries: StructStaticEntry[];

  constructor(
    name: string,
    options: {
      staticEntries?: StructStaticEntry[];
      dynamicEntries?: StructDynamicEntry[];
      staticOptionalEntries?: StructStaticEntry[];
    }
  ) {
    const staticEntries = options.staticEntries
      ? [...options.staticEntries]
      : [];
    const dynamicEntries = options.dynamicEntries
      ? [...options.dynamicEntries]
      : [];
    const staticOptionalEntries = options.staticOptionalEntries
      ? [...options.staticOptionalEntries]
      : [];

    super(name, function* (this: Schema<any>, inputValue, ctx) {
      if (!object.is(inputValue)) {
        yield [
          null,
          new ValidationError(
            fmt`Expected a "struct" but received "${inputValue}"`,
            inputValue,
            this
          ),
        ];
        return;
      }

      const unknownKeys = new Set(Object.keys(inputValue));
      const value: Record<string, unknown> = Object.create(null);

      for (const [key, schema] of staticEntries) {
        const inputEntryValue = (inputValue as Record<string, unknown>)[key];
        const parentHasOwnProperty = inputValue.hasOwnProperty(key);
        const result = schema.evaluate(inputEntryValue, {
          ...ctx,
          key,
          parentHasOwnProperty,
        });
        for (const [entryValue, error] of result) {
          if (error) yield [null, error.addEntry(key, inputValue, this)];
          else if (parentHasOwnProperty) value[key] = entryValue;
        }
        unknownKeys.delete(key);
      }

      for (const [key, schema] of staticOptionalEntries) {
        const inputEntryValue = (inputValue as Record<string, unknown>)[key];
        const parentHasOwnProperty = inputValue.hasOwnProperty(key);
        const result = union(
          schema,
          StructSchema.exactOptionalPropertyTypes ? never : literal(undefined)
        ).evaluate(inputEntryValue, {
          ...ctx,
          key,
          parentHasOwnProperty,
        });
        for (const [entryValue, error] of result) {
          if (error) yield [null, error.addEntry(key, inputValue, this)];
          else if (parentHasOwnProperty) value[key] = entryValue;
        }
        unknownKeys.delete(key);
      }

      const allKeys = new Set(Object.keys(inputValue));

      for (const [keySchema, valueSchema] of dynamicEntries) {
        for (const key of allKeys) {
          if (!keySchema.is(key)) continue;
          const inputEntryValue = (inputValue as Record<string, unknown>)[key];
          const result = valueSchema.evaluate(inputEntryValue, {
            ...ctx,
            key,
            parentHasOwnProperty: true,
          });
          for (const [entryValue, error] of result) {
            if (error) yield [null, error.addEntry(key, inputValue, this)];
            else value[key] = entryValue;
          }
          unknownKeys.delete(key);
        }
      }

      if (ctx.unknownKeys !== "ignore")
        for (const key of unknownKeys) {
          const inputEntryValue = (inputValue as Record<string, unknown>)[key];
          const result = (ctx.unknownKeys === "keep" ? any : never).evaluate(
            inputEntryValue,
            {
              ...ctx,
              key,
              parentHasOwnProperty: true,
            }
          );
          for (const [entryValue, error] of result) {
            if (error) yield [null, error.addEntry(key, inputValue, this)];
            else value[key] = entryValue;
          }
        }

      yield [value as any, null];
    });

    this.staticEntries = staticEntries;
    this.dynamicEntries = dynamicEntries;
    this.staticOptionalEntries = staticOptionalEntries;
  }
}

export type StructKey = string;
export type StructStaticEntry = [key: string, schema: Schema<unknown>];
export type StructDynamicEntry = [
  key: Schema<StructKey>,
  schema: Schema<unknown>
];
