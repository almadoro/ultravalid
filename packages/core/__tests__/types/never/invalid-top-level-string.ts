import { never } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<never> = {
  spec: never,
  value: "asd",
};

export default test;
