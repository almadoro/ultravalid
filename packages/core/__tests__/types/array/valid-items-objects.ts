import { array } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<{ test: "123" }[]> = {
  spec: array({ test: "123" }),
  value: [{ test: "123" }],
  differentInstance: true,
};

export default test;
