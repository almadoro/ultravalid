import { string } from "@almadoro/uv-core";
import { includes } from "@almadoro/uv-refinements";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<string> = {
  spec: string.refine(includes("foo")),
  value: "bar",
};

export default test;
