import { any, type } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<any> = {
  spec: type(any),
  value: 1,
};

export default test;
