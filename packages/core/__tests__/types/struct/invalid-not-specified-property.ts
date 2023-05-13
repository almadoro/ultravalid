import { string, struct } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<{ id: string }> = {
  spec: struct({ id: string }),
  value: { id: "123", notValidProp: 123 },
  error: {
    branch: [{ id: "123", notValidProp: 123 }, 123],
    path: ["notValidProp"],
    types: ["struct", "never"],
  },
};

export default test;
