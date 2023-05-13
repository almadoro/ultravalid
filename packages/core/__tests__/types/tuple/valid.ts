import { array, number, string, tuple } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<["const", string, number, string[]]> = {
  spec: tuple("const", string, number, array(string)),
  value: ["const", "str", 123, ["asd"]],
  differentInstance: true,
};

export default test;
