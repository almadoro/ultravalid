import { number, string, union } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<number | { id: string; name?: string }> = {
  spec: union(number, { id: string, "name?": string }),
  value: {
    id: "an-id",
  },
  differentInstance: true,
};

export default test;
