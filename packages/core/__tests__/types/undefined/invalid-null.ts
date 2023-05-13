import { type } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<undefined> = {
  spec: type(undefined),
  value: null,
};

export default test;
