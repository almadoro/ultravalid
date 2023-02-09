import { Schema, schema, validate, ValidationError } from "@ultravalid/core";

test("Throwed errors are forwarded", () => {
  const spec = schema("customType", () => {
    throw new Error("");
  });
  expect(() => validate("", spec)).toThrow(Error);
});

const spec = schema(
  "customType",
  (v) => typeof v === "object" || "An error ocurred"
);

test("Failed validation", () => {
  const { value, error } = validate(123, spec);
  expect(value).toBeNull();
  expect(error).toBeInstanceOf(ValidationError);
});

test("Successful validation", () => {
  const initValue = { id: "1984" };
  const { value, error } = validate(initValue, spec);
  expect(value).toBe(initValue);
  expect(error).toBeNull();
});

test("Throws an Error when schema doesnt yield", () => {
  const spec = new Schema("custom", function* () {});
  expect(() => validate(1, spec)).toThrow(Error);
});
