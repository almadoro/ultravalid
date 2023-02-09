import { Schema } from "./schema";

export default class ValidationError extends Error {
  /**
   * An array with the root value and corresponding values for each `path` item
   */
  public readonly branch: unknown[];
  /**
   * Contains evaluated schema for each `branch` item.
   */
  public readonly schema: Schema<unknown>[];
  /**
   * Descending order keys from root value to the actual failing value.
   */
  public readonly path: string[] = [];

  constructor(message: string, value: unknown, schema: Schema<unknown>) {
    super(message);
    this.branch = [value];
    this.schema = [schema];
  }

  public addEntry(key: string, value: unknown, schema: Schema<unknown>) {
    this.path.unshift(key);
    this.branch.unshift(value);
    this.schema.unshift(schema);
    return this;
  }
}
