import { number } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: number,
  value: BigInt(42),
};

export default test;
