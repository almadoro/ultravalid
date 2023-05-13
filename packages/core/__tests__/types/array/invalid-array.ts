import { any, array } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<any[]> = {
  spec: array(any),
  value: "123",
};

export default test;
