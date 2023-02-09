import { array, number } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<number[]> = {
  spec: array(number),
  value: [],
  differentInstance: true,
};

export default test;
