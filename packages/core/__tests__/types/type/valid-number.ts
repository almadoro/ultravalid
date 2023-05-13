import { number, type } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<number> = {
  spec: type(number),
  value: 1,
};

export default test;
