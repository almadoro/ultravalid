import { string, type } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<string> = {
  spec: type(string),
  value: "",
};

export default test;
