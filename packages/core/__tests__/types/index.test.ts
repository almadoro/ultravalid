import { StructSchema, validate, ValidationError } from "@ultravalid/core";
import * as fs from "fs";
import * as path from "path";
import {
  ErrorContext,
  InvalidTestExports,
  ValidTestExports,
} from "./testTypes";

const typesTests = fs
  .readdirSync(path.resolve(__dirname), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

const tests = typesTests.map((typeDir) => {
  const testFiles = fs.readdirSync(path.resolve(__dirname, typeDir), {
    withFileTypes: false,
    encoding: "utf-8",
  });
  return {
    testType: typeDir,
    typeTests: testFiles.map((file) => ({
      testName: file.replace(/\.ts$/, ""),
      testPath: path.resolve(__dirname, typeDir, file),
    })),
  };
});

for (const { typeTests, testType } of tests) {
  describe(testType, () => {
    const filteredTypeTests = !globalThis.file
      ? typeTests
      : typeTests.filter(({ testPath }) => testPath === globalThis.file);
    for (const { testName, testPath } of filteredTypeTests) {
      const exportedTest = require(testPath).default;
      test(testName, () => {
        switch (true) {
          case testName.startsWith("valid"):
            validTest(exportedTest);
            break;
          case testName.startsWith("invalid"):
            invalidTest(exportedTest);
            break;
          default:
            console.error(`Invalid test file: ${testName}`);
        }
      });
    }
  });
}

function validTest({
  spec,
  value: inputValue,
  differentInstance,
  exactOptionalPropertyTypes,
}: ValidTestExports<unknown>) {
  StructSchema.exactOptionalPropertyTypes = exactOptionalPropertyTypes || false;
  const { value, error } = validate(inputValue, spec);
  expect(error).toBeNull();
  if (differentInstance) {
    expect(value).not.toBe(inputValue);
    expect(value).toMatchObject(inputValue as object);
  } else expect(value).toBe(inputValue);
}

function invalidTest({
  spec,
  value: inputValue,
  error: ctx,
  exactOptionalPropertyTypes,
}: InvalidTestExports) {
  StructSchema.exactOptionalPropertyTypes = exactOptionalPropertyTypes || false;
  const { value, error } = validate(inputValue, spec);
  expect(value).toBeNull();
  expect(error).toBeInstanceOf(ValidationError);
  const oneLevelErrorContext = {
    branch: [inputValue],
    path: [],
    types: [spec.name],
  };
  assertValidationError(error as ValidationError, ctx || oneLevelErrorContext);
}

function assertValidationError(
  error: ValidationError,
  { branch, path, types }: ErrorContext
) {
  expect(error.branch).toEqual(branch);
  expect(error.path).toEqual(path);
  expect(error.schema.map(({ name }) => name)).toEqual(types);
}

declare global {
  var file: string | undefined;
}
