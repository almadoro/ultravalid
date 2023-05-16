import { Coercion } from "./coercion";
import { Refinement } from "./refinement";
import { fmt } from "./utils";
import ValidationError from "./ValidationError";

/**
 * Creates a new schema with the specified `name` and type validation function.
 */
export default function schema<TValue>(
  name: string,
  typeCheckFn: TypeCheckFn<Schema<TValue, null>>
) {
  return new Schema<TValue, null>(name, null, function* (value, ctx) {
    const result = typeCheckFn(value, ctx);
    if (result === true) yield [value as TValue, null];
    else {
      const message =
        result ||
        fmt`Expected type "${ctx.schema.name}" but received "${value}"`;
      yield [null, new ValidationError(message, value, ctx.schema)];
    }
  });
}

export class Schema<TValue, TMetadata> {
  public static config: SchemaConfig = {
    exactOptionalPropertyTypes: false,
    defaultAttemptOptions: {
      unknownKeys: "error",
    },
  };

  protected readonly coercions: Coercion<any, any>[] = [];
  protected readonly refinements: Refinement<TValue>[] = [];

  constructor(
    public readonly name: string,
    public readonly metadata: TMetadata,
    private typeCheckGenFn: TypeCheckGenFn<TValue, Schema<TValue, TMetadata>>
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
  public assert(
    value: unknown,
    options: AttemptOptions = Schema.config.defaultAttemptOptions
  ): asserts value is TValue {
    const [, error] = this._attempt(value, { options });
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
  public is(
    value: unknown,
    options: AttemptOptions = Schema.config.defaultAttemptOptions
  ): value is TValue {
    const [, error] = this._attempt(value, { options });
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
    value: unknown,
    options: AttemptOptions = Schema.config.defaultAttemptOptions
  ): { value: TValue; error: null } | { value: null; error: ValidationError } {
    const [nValue, error] = this._attempt(value, { options });
    if (error) return { value: null, error };
    return { value: nValue, error: null };
  }

  public coerce<C extends Coercion<any, any>[]>(...coercions: C) {
    const schema = this.clone();
    schema.coercions.push(...coercions);
    return schema;
  }

  public refine<R extends Refinement<TValue>[]>(...refinements: R) {
    const schema = this.clone();
    schema.refinements.push(...refinements);
    return schema;
  }

  public _attempt(
    inputValue: unknown,
    ctx: AttemptContext
  ): [TValue, null] | [null, ValidationError] {
    const [value, error] = this.attemptTypeCheck(inputValue, ctx);

    if (error) return [null, error];

    for (const refinement of this.refinements) {
      const result = refinement.evaluate(value);
      if (result === true) continue;
      return [null, new ValidationError(result, value, this)];
    }

    return [value, null];
  }

  protected clone() {
    const schema = new Schema(this.name, this.metadata, this.typeCheckGenFn);
    schema.coercions.concat(this.coercions);
    schema.refinements.concat(this.refinements);
    return schema;
  }

  private attemptTypeCheck(
    inputValue: unknown,
    ctx: AttemptContext
  ): [TValue, null] | [null, ValidationError] {
    const [value, error] = this.typeCheckResult(inputValue, ctx);

    if (!error) return [value, null];
    if (ctx.options.disableCoercions) return [null, error];

    for (const coercion of this.coercions) {
      if (!coercion.inputSchema.is(inputValue)) continue;
      const [value, error] = this.typeCheckResult(
        coercion.evaluate(inputValue),
        ctx
      );
      if (!error) return [value, null];
    }

    return [null, error];
  }

  private typeCheckResult(inputValue: unknown, ctx: AttemptContext) {
    const it = this.typeCheckGenFn(inputValue, { ...ctx, schema: this });
    const result = it.next();
    if (result.done)
      throw new Error("Expected schema evaluation to yield results");
    return result.value;
  }
}

export interface SchemaConfig {
  exactOptionalPropertyTypes: boolean;
  defaultAttemptOptions: AttemptOptions;
}

export interface AttemptOptions {
  unknownKeys?: "error" | "ignore" | "keep";
  disableCoercions?: boolean;
}

export interface AttemptContext {
  options: AttemptOptions;
  key?: string;
  parentHasOwnProperty?: boolean;
}

export interface TypeCheckContext<S extends Schema<any, any>>
  extends AttemptContext {
  schema: S;
}

export type TypeCheckFn<S extends Schema<any, any>> = (
  value: unknown,
  ctx: TypeCheckContext<S>
) => boolean | string;

export type TypeCheckGenFn<T, S extends Schema<any, any>> = (
  value: unknown,
  ctx: TypeCheckContext<S>
) => TypeCheckGenFnReturn<T>;

export type TypeCheckGenFnReturn<T> = Generator<
  [value: T, error: null] | [value: null, error: ValidationError]
>;
