import { array } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<{ test: "123" }[]> = {
  spec: array({ test: "123" }),
  value: [{ test: "123" }],
  differentInstance: true,
};

export default test;
