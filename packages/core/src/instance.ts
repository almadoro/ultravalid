import { Schema, TypeCheckGenFn } from "./schema";
import { fmt } from "./utils";
import ValidationError from "./ValidationError";

/**
 * Validates value is an instance of the specified class. This validation is
 * `type` parseable.
 *
 * @example
 * instance(Date);
 * type(RegExp); // Same as "instance(RegExp)"
 */
export default function instance<C extends InstanceSpec>(spec: C) {
  return new Schema<InstanceType<C>, InstanceMetadata<C>>(
    "instance",
    {
      class: spec,
    },
    instaceTypeCheck
  );
}

export const instaceTypeCheck: TypeCheckGenFn<
  any,
  Schema<any, InstanceMetadata<any>>
> = function* (inputValue, ctx) {
  const result = inputValue instanceof ctx.schema.metadata.class;
  if (result) yield [inputValue, null];
  else {
    const message = fmt`Expected an instance of "${ctx.schema.metadata.class.name}" but received "${inputValue}"`;
    yield [null, new ValidationError(message, inputValue, ctx.schema)];
  }
};

export type InstanceSpec = new (...args: any[]) => any;

export interface InstanceMetadata<C> {
  class: C;
}
