import { any, array } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: array(any),
  value: "123",
};

export default test;
