import { number, string, tuple } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<[string, number, number]> = {
  spec: tuple(string, number, number),
  value: "str",
};

export default test;
