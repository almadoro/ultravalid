import schema from "./schema";
import { fmt } from "./utils";

/**
 * Validates value is an instance of the specified class. This validation is
 * `type` parseable.
 *
 * @example
 * instance(Date);
 * type(RegExp); // Same as "instance(RegExp)"
 */
export default function instance<C extends InstanceSpec<T>, T>(spec: C) {
  return schema<T>(
    "instance",
    (value) =>
      value instanceof spec ||
      fmt`Expected an instance of "${spec.name}" but received ${value}`
  );
}

export type InstanceSpec<T> = { new (...args: any[]): T };
