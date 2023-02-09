import { Schema } from "@ultravalid/core";

export type ValidTestExports<T> = TestBaseExports<T> & {
  differentInstance?: boolean;
};

export type InvalidTestExports = TestBaseExports<unknown> & {
  error?: ErrorContext;
};

export type TestBaseExports<T> = {
  spec: Schema<T>;
  value: T;
  exactOptionalPropertyTypes?: boolean;
};

export type ErrorContext = {
  branch: unknown[];
  path: string[];
  types: string[];
};
