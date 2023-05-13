import { Schema, TypeCheckGenFn } from "./schema";
import type, { Spec, SpecType } from "./type";
import { ArrayElement, fmt, Narrow } from "./utils";
import ValidationError from "./ValidationError";

/**
 * Validates the value satisfies one of the schemas.
 *
 * @example
 * union("Point2D", number, number);
 * type([number, string]); // Same as "union(number, string)"
 */
export default function union<S extends Spec[]>(...specs: Narrow<S>) {
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
