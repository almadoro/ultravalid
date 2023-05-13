import { string } from "@almadoro/uv-core";
import { maxLength } from "@almadoro/uv-refinements";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<string> = {
  spec: string.refine(maxLength(2)),
  value: "123",
};

export default test;
