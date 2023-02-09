import { string, struct } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: struct({ id: string }),
  value: {},
  error: {
    branch: [{}, undefined],
    path: ["id"],
    types: ["struct", "string"],
  },
};

export default test;
