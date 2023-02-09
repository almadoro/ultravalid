import { number } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<number> = {
  spec: number,
  value: 0,
};

export default test;
