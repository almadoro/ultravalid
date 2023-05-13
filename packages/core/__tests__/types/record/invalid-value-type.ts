import { number, record, string } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<Record<string, number>> = {
  spec: record(string, number),
  value: { prop: "1" },
  error: {
    branch: [{ prop: "1" }, "1"],
    path: ["prop"],
    types: ["record", "number"],
  },
};

export default test;
