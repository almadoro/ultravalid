import { coercion, string, union } from "@almadoro/uv-core";

/**
 * Apply the `URL()` constructor to the value.

 * @example
 * instance(URL).coerce(toUrl);
 */
function toUrl(base?: string | URL) {
  return coercion(union(string, URL), (v) => {
    try {
      return new URL(v, base);
    } catch {
      return v;
    }
  });
}

export default toUrl;
