import { object, type } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<object> = {
  spec: type(object),
  value: {},
};

export default test;
