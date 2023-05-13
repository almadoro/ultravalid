import { Schema } from "@almadoro/uv-core";

export type ValidTestExports<T> = {
  differentInstance?: boolean;
  spec: Schema<T, any>;
  value: T;
  exactOptionalPropertyTypes?: boolean;
};

export type InvalidTestExports<T> = {
  error?: ErrorContext;
  spec: Schema<T, any>;
  value: unknown;
  exactOptionalPropertyTypes?: boolean;
};

export type ErrorContext = {
  branch: unknown[];
  path: string[];
  types: string[];
};
