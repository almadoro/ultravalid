import { boolean, type } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: type(boolean),
  value: 0,
};

export default test;
