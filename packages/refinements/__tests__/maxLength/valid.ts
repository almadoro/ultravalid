import { string } from "@almadoro/uv-core";
import { maxLength } from "@almadoro/uv-refinements";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<string> = {
  spec: string.refine(maxLength(3)),
  value: "123",
};

export default test;
