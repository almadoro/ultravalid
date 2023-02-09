import { string, type } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<string> = {
  spec: type(string),
  value: "test",
};

export default test;
