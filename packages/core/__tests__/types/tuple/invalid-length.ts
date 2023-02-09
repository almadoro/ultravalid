import { number, string, tuple } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: tuple(string, number, number),
  value: ["str", 1, 2, "3"],
  error: {
    branch: [["str", 1, 2, "3"], "3"],
    path: ["3"],
    types: ["tuple", "never"],
  },
};

export default test;
