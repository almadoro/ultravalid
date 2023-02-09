import { never, type } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<{ prop?: never }> = {
  spec: type({ "prop?": never }),
  value: {},
  differentInstance: true,
};

export default test;
