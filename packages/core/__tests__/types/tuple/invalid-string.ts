import { number, string, tuple } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: tuple(string, number, number),
  value: "str",
};

export default test;
