import { symbol, type } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: type(symbol),
  value: "@@iterator",
};

export default test;
