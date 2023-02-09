import { array, number } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: array(number),
  value: [123, 98, "456"],
  error: {
    branch: [[123, 98, "456"], "456"],
    path: ["2"],
    types: ["array", "number"],
  },
};

export default test;
