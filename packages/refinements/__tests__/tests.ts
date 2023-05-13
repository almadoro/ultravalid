import { Schema } from "@almadoro/uv-core";

export type ValidTestExports<T> = {
  spec: Schema<T, any>;
  value: T;
};

export type InvalidTestExports<T> = {
  spec: Schema<T, any>;
  value: T;
  error?: ErrorContext;
};

export type ErrorContext = {
  branch: unknown[];
  path: string[];
  types: string[];
};
