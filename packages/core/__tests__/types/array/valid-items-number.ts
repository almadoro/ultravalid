import { array, number } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<number[]> = {
  spec: array(number),
  value: [1, 2, 3],
  differentInstance: true,
};

export default test;
