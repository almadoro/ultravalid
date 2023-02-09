import { fmt } from "./utils";
import ValidationError from "./ValidationError";

/**
 * Creates a new schema with the specified `name` and type validation function.
 */
export default function schema<T>(name: string, typeFn: TypeFunction) {
  return new Schema<T>(name, function* (
    this: Schema<T>,
    value: unknown,
    ctx: ValidationContext
  ) {
    const result = typeFn(value, ctx);
    if (result === true) yield [value as T, null];
    else {
      const message =
        result || fmt`Expected type "${this.name}" but received "${value}"`;
      yield [null, new ValidationError(message, value, this)];
    }
  });
}

export class Schema<T> {
  constructor(
    public readonly name: string,
    public readonly evaluate: EvaluateFn<T>
  ) {}

  /**
   * Asserts `value` matches the schema. In case of a failure a
   * `ValidationError` will be thrown.
   *
   * @example
   * let value: unknown;
   * let spec: Schema<{ prop: string }>;
   * spec.assert(value);
   * // Following code only executes if validation succeeds and value
   * // will be typed.
   * value.prop;
   */
  public assert(value: unknown): asserts value is T {
    const result = this.evaluate(value, {}).next();
    if (result.done)
      throw new Error("Expected schema evaluation to yield results");
    const [, error] = result.value;
    if (error) throw error;
  }

  /**
   * Returns if `value` matches the schema.
   *
   * @example
   * let value: unknown;
   * let spec: Schema<{ prop: string }>;
   * if (spec.is(value)) {
   *  // TS knows the corresponding type in this block
   *  value.prop;
   * }
   */
  public is(value: unknown): value is T {
    const result = this.evaluate(value, {}).next();
    if (result.done)
      throw new Error("Expected schema evaluation to yield results");
    const [, error] = result.value;
    return !error;
  }

  /**
   * Returns validation result object containing:
   *
   * - `value`: in case of success a value that matches the schema. Otherwise
   * `null`.
   * - `error`: in case of failure a `ValidationError` instance. Otherwise
   * `null`.
   *
   * @example
   * let inputValue: unknown;
   * let spec: Schema<{ prop: string }>;
   * const { value, error } = spec.validate(inputValue);
   * if (error) {
   *  // Here TS understands value is null and error a
   *  // `ValidationError` instance.
   * } else {
   *  // Here value has schema's corresponding type
   *  value.prop;
   * }
   */
  public validate(
    value: unknown
  ): { value: T; error: null } | { value: null; error: ValidationError } {
    const result = this.evaluate(value, {}).next();
    if (result.done)
      throw new Error("Expected schema evaluation to yield results");
    const [nValue, error] = result.value;
    if (error) return { value: null, error };
    return { value: nValue, error: null };
  }
}

export type EvaluateFn<T> = (
  value: unknown,
  ctx: ValidationContext
) => EvaluateFnReturn<T>;

export type EvaluateFnReturn<T> = Generator<
  [value: T, error: null] | [value: null, error: ValidationError]
>;

export interface ValidationContext {
  key?: string;
  parentHasOwnProperty?: boolean;
  unknownKeys?: "ignore" | "keep" | "error";
}

export type TypeFunction = (
  value: unknown,
  ctx: ValidationContext
) => boolean | string;
