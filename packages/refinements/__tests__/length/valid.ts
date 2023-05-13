import { string } from "@almadoro/uv-core";
import { length } from "@almadoro/uv-refinements";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<string> = {
  spec: string.refine(length(3)),
  value: "123",
};

export default test;
