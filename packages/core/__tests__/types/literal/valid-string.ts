import { literal } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<"123"> = {
  spec: literal("123"),
  value: "123",
};

export default test;
