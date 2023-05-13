import { array, number } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<number[]> = {
  spec: array(number),
  value: [],
  differentInstance: true,
};

export default test;
