import { literal } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<"123"> = {
  spec: literal("123"),
  value: "123",
};

export default test;
