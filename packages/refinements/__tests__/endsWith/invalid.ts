import { string } from "@almadoro/uv-core";
import { endsWith } from "@almadoro/uv-refinements";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<string> = {
  spec: string.refine(endsWith("start")),
  value: "start-end",
};

export default test;
