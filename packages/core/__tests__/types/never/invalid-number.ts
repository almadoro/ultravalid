import { never, type } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: type({ prop: never }),
  value: { prop: 123 },
  error: {
    branch: [{ prop: 123 }, 123],
    path: ["prop"],
    types: ["struct", "never"],
  },
};

export default test;
