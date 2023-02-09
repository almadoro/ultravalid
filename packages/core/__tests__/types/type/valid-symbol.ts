import { symbol, type } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<symbol> = {
  spec: type(symbol),
  value: Symbol(),
};

export default test;
