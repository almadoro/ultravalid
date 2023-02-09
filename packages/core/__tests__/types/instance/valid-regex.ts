import { instance } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<RegExp> = {
  spec: instance(RegExp),
  value: /.*/g,
};

export default test;
