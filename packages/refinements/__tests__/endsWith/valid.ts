import { string } from "@almadoro/uv-core";
import { endsWith } from "@almadoro/uv-refinements";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<string> = {
  spec: string.refine(endsWith("end")),
  value: "starts-end",
};

export default test;
