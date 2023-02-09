import { number, string, struct } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<{ id: number; name?: string }> = {
  spec: struct({ id: number, "name?": string }),
  value: { id: 123 },
  differentInstance: true,
};

export default test;
