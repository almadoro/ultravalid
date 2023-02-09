import { type } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: type(undefined),
  value: null,
};

export default test;
