import { never, type } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<{ prop: never }> = {
  spec: type({ "prop?": never }),
  value: { prop: undefined },
  error: {
    branch: [{ prop: undefined }, undefined],
    path: ["prop"],
    types: ["struct", "union"],
  },
  exactOptionalPropertyTypes: true,
};

export default test;
