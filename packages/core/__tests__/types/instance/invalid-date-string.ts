import { type } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: type(Date),
  value: "2022-04-27T22:28:49.667Z",
};

export default test;
