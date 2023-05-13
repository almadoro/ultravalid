import { string, struct } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<{ level1: { level2: [string] } }> = {
  spec: struct({ level1: { level2: [string] } }),
  value: { level1: { level2: [1] } },
  error: {
    branch: [{ level1: { level2: [1] } }, { level2: [1] }, [1], 1],
    path: ["level1", "level2", "0"],
    types: ["struct", "struct", "tuple", "string"],
  },
};

export default test;
