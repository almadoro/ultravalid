import { type } from "@almadoro/uv-core";
import { validDate } from "@almadoro/uv-refinements";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<Date> = {
  spec: type(Date).refine(validDate),
  value: new Date(),
};

export default test;
