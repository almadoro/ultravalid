import { string, type } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<string> = {
  spec: type(string),
  value: 1,
};

export default test;
