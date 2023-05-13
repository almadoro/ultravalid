import { string, type } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<string> = {
  spec: type(string),
  value: "test",
};

export default test;
