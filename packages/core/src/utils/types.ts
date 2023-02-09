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

export type ArrayElement<A extends unknown[]> = A extends (infer T)[]
  ? T
  : never;

/**
 * Prevent type widening on generic function parameters
 *
 * @example
 * declare function notnarrow<S>(_: S): S;
 * declare function narrow<S>(_: Narrow<S>): S;
 *
 * const notnarrowed = notnarrow({ prop: [1, 2, "3"], lit: "str" });
 * // notnarrowed type is  { prop: (string | number)[], lit: string }
 *
 * const narrowed = narrow({ prop: [1, 2, "3"], lit: "str" });
 * // narrowed type is { prop: [1, 2, "3"], lit: "str" }
 */
export type Narrow<T extends any> = Try<T, [], _Narrow<T>>;

type _Narrow<T> =
  | (T extends [] ? [] : never)
  | (T extends Narrowable ? T : never)
  | {
      [K in keyof T]: T[K] extends Function ? T[K] : _Narrow<T[K]>;
    };

type Try<A1 extends any, A2 extends any, Catch = never> = A1 extends A2
  ? A1
  : Catch;

type Narrowable =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;
