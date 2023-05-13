import { array, number } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<number[]> = {
  spec: array(number),
  value: [1, 2, 3],
  differentInstance: true,
};

export default test;
