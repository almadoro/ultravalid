import { record, string } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: record("prop", string),
  value: { prop: "1", notExpected: "2" },
  error: {
    branch: [{ prop: "1", notExpected: "2" }, "2"],
    path: ["notExpected"],
    types: ["record", "never"],
  },
  exactOptionalPropertyTypes: true,
};

export default test;
