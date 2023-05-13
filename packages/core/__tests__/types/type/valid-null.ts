import { type } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<null> = {
  spec: type(null),
  value: null,
};

export default test;
