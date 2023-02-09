import { number, string, union } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: union(string, number),
  value: true,
};

export default test;
