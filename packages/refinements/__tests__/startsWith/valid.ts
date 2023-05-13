import { string } from "@almadoro/uv-core";
import { startsWith } from "@almadoro/uv-refinements";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<string> = {
  spec: string.refine(startsWith("starts")),
  value: "starts-end",
};

export default test;
