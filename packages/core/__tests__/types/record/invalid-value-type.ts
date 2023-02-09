import { number, record, string } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: record(string, number),
  value: { prop: "1" },
  error: {
    branch: [{ prop: "1" }, "1"],
    path: ["prop"],
    types: ["record", "number"],
  },
};

export default test;
