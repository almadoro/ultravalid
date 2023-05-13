import { number, string, struct } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<{ id: number; name?: string }> = {
  spec: struct({ id: number, "name?": string }),
  value: { id: 123 },
  differentInstance: true,
};

export default test;
