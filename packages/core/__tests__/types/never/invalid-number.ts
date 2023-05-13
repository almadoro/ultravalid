import { never, type } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<{ prop: never }> = {
  spec: type({ prop: never }),
  value: { prop: 123 },
  error: {
    branch: [{ prop: 123 }, 123],
    path: ["prop"],
    types: ["struct", "never"],
  },
};

export default test;
