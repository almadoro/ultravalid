import { string, struct } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: struct({ id: string }),
  value: { id: "123", notValidProp: 123 },
  error: {
    branch: [{ id: "123", notValidProp: 123 }, 123],
    path: ["notValidProp"],
    types: ["struct", "never"],
  },
};

export default test;
