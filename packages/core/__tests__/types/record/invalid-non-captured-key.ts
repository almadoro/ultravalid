import { record, string } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<Record<"prop", string>> = {
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
