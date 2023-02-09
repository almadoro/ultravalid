import { never } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: never,
  value: "asd",
};

export default test;
