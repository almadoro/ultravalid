import { type } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<Date> = {
  spec: type(Date),
  value: new Date(),
};

export default test;
