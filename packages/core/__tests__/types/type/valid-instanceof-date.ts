import { type } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<Date> = {
  spec: type(Date),
  value: new Date(),
};

export default test;
