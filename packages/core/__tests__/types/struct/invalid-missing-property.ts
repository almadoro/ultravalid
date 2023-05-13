import { string, struct } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<{ id: string }> = {
  spec: struct({ id: string }),
  value: {},
  error: {
    branch: [{}, undefined],
    path: ["id"],
    types: ["struct", "string"],
  },
};

export default test;
