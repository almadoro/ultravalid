import { any, type } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<any> = {
  spec: type(any),
  value: 1,
};

export default test;
