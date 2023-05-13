import { Schema } from "@almadoro/uv-core";

export type ValidTestExports<I, O> = {
  input: I;
  output: O;
};

export type InvalidTestExports<T, I> = {
  spec: Schema<T, any>;
  value: I;
  error?: ErrorContext;
};

export type ErrorContext = {
  branch: unknown[];
  path: string[];
  types: string[];
};
