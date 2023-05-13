import { type } from "@almadoro/uv-core";
import { validDate } from "@almadoro/uv-refinements";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<Date> = {
  spec: type(Date).refine(validDate),
  value: new Date(NaN),
};

export default test;
