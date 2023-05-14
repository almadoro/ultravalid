/**
 * Beautifies type preview in code editors.
 */
export type ExpandRecursively<T> = T extends Record<PropertyKey, unknown>
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;

/**
 * Merges an union type into a single intersection.
 */
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type ArrayElement<A extends readonly any[]> = A extends ReadonlyArray<
  infer T
>
  ? T
  : never;

export type Writeable<A> = { -readonly [K in keyof A]: A[K] };
