import { boolean, type } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<boolean> = {
  spec: type(boolean),
  value: false,
};

export default test;
