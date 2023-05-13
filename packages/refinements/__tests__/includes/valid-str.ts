import { string } from "@almadoro/uv-core";
import { includes } from "@almadoro/uv-refinements";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<string> = {
  spec: string.refine(includes("foo")),
  value: "foo",
};

export default test;
