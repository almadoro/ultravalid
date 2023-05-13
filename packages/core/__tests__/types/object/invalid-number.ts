import { object, type } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<object> = {
  spec: type(object),
  value: 3,
};

export default test;
