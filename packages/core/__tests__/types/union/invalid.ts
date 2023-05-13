import { number, string, union } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<string | number> = {
  spec: union(string, number),
  value: true,
};

export default test;
