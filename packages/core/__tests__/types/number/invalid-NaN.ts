import { number } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: number,
  value: NaN,
};

export default test;
