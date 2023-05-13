import { any, array } from "@almadoro/uv-core";
import { includes } from "@almadoro/uv-refinements";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<any[]> = {
  spec: array(any).refine(includes("foo")),
  value: ["foo"],
};

export default test;
