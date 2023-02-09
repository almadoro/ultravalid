import { number, string, union } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<number | { id: string; name?: string }> = {
  spec: union(number, { id: string, "name?": string }),
  value: 123,
};

export default test;
