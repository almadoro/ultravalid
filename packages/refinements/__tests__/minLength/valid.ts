import { string } from "@almadoro/uv-core";
import { minLength } from "@almadoro/uv-refinements";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<string> = {
  spec: string.refine(minLength(3)),
  value: "123",
};

export default test;
