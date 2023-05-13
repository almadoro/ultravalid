import { Schema } from "./schema";

export default function coercion<TInput, TOutput>(
  inputSchema: Schema<TInput, any>,
  coercionFn: CoercionFn<TInput, TOutput>
) {
  return new Coercion<TInput, TOutput>(inputSchema, coercionFn);
}

export class Coercion<TInput, TOutput> {
  constructor(
    public inputSchema: Schema<TInput, any>,
    public evaluate: CoercionFn<TInput, TOutput>
  ) {}
}

export type CoercionFn<TInput, TOutput> = (value: TInput) => TOutput;
