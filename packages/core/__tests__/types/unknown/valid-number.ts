import { type, unknown } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<unknown> = {
  spec: type(unknown),
  value: 1,
};

export default test;
