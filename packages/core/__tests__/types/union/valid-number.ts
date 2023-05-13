import { number, string, union } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<number | { id: string; name?: string }> = {
  spec: union(number, { id: string, "name?": string }),
  value: 123,
};

export default test;
