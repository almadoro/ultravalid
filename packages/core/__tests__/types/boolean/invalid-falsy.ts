import { boolean, type } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<boolean> = {
  spec: type(boolean),
  value: 0,
};

export default test;
