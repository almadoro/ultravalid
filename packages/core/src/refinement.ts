export default function refinement<T>(
  name: string,
  refinementFn: RefinementFn<T>
) {
  return new Refinement<T>(name, refinementFn);
}

export class Refinement<T> {
  constructor(public name: string, public evaluate: RefinementFn<T>) {}
}

export type RefinementFn<T> = (value: T) => string | true;
