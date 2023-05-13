import { number, string, union } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<number | { id: string; name?: string }> = {
  spec: union(number, { id: string, "name?": string }),
  value: {
    id: "an-id",
  },
  differentInstance: true,
};

export default test;
