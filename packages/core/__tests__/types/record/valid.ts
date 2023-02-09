import { any, record, string } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<Record<string, any>> = {
  spec: record(string, any),
  value: { prop: 1 },
  differentInstance: true,
};

export default test;
