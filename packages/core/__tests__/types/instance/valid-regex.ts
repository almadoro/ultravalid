import { instance } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<RegExp> = {
  spec: instance(RegExp),
  value: /.*/g,
};

export default test;
