import { never, type } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: type({ "prop?": never }),
  value: { prop: undefined },
  error: {
    branch: [{ prop: undefined }, undefined],
    path: ["prop"],
    types: ["struct", "union"],
  },
  exactOptionalPropertyTypes: true,
};

export default test;
