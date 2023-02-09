import { boolean, type } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<boolean> = {
  spec: type(boolean),
  value: false,
};

export default test;
