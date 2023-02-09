import { number, type } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<number> = {
  spec: type(number),
  value: 1,
};

export default test;
