import { type } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<Date> = {
  spec: type(Date),
  value: "2022-04-27T22:28:49.667Z",
};

export default test;
