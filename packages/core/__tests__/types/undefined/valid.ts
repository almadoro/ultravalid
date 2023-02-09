import { type } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<undefined> = {
  spec: type(undefined),
  value: undefined,
};

export default test;
