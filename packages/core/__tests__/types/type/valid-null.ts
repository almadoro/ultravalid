import { type } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<null> = {
  spec: type(null),
  value: null,
};

export default test;
