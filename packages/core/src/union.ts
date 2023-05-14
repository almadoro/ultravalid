import ValidationError from "./ValidationError";
import { Schema, TypeCheckGenFn } from "./schema";
import type, { SpecType } from "./type";
import { ArrayElement, fmt } from "./utils";

/**
 * Validates the value satisfies one of the schemas.
 *
 * @example
 * union("Point2D", number, number);
 * type([number, string]); // Same as "union(number, string)"
 */
export default function union<const S extends readonly any[]>(...specs: S) {
  const schemas = specs.map((spec) => type(spec));
  return new Schema<SpecType<ArrayElement<S>>, UnionMetadata>(
    "union",
    { schemas },
    unionTypeCheck
  );
}

const unionTypeCheck: TypeCheckGenFn<
  any,
  Schema<any, UnionMetadata>
> = function* (inputValue, ctx) {
  const errorMsgs: string[] = [];
  for (const type of ctx.schema.metadata.schemas) {
    const { value, error } = type.validate(inputValue, ctx.options);
    if (error) {
      errorMsgs.push(error.message);
      continue;
    }
    yield [value, null];
    return;
  }
  yield [
    null,
    new ValidationError(
      fmt`Invalid value "${inputValue}" received. Expected to satisfy one of multiple schemas.` +
        `The reported errors are:\n${errorMsgs.join("\n")}`,
      inputValue,
      ctx.schema
    ),
  ];
};

export interface UnionMetadata {
  schemas: Schema<any, any>[];
}
