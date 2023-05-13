import { object, type } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<object> = {
  spec: type(object),
  value: {},
};

export default test;
