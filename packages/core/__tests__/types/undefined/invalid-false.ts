import { type } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: type(undefined),
  value: false,
};

export default test;
