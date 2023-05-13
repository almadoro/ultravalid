import { assert, number, refinement, ValidationError } from "@almadoro/uv-core";

const MIN_VALUE = 2;

const min = refinement<number>(
  "min",
  (v) => v > MIN_VALUE || `Expected to be bigger than ${MIN_VALUE}`
);

const schema = number.refine(min);

test(`min refinement with ${MIN_VALUE} fails for lower value`, () => {
  expect(() => assert(MIN_VALUE - 1, schema)).toThrow(ValidationError);
});

test(`min refinement with ${MIN_VALUE} succeds for bigger value`, () => {
  expect(() => assert(MIN_VALUE + 1, schema)).not.toThrow(ValidationError);
});
