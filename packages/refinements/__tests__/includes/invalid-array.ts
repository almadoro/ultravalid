import { any, array } from "@almadoro/uv-core";
import { includes } from "@almadoro/uv-refinements";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<any[]> = {
  spec: array(any).refine(includes("foo")),
  value: ["bar"],
};

export default test;
