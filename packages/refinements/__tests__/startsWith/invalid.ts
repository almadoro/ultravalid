import { string } from "@almadoro/uv-core";
import { startsWith } from "@almadoro/uv-refinements";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<string> = {
  spec: string.refine(startsWith("end")),
  value: "start-end",
};

export default test;
