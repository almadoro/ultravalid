import { validate, ValidationError } from "@almadoro/uv-core";
import * as fs from "fs";
import * as path from "path";
import { ErrorContext, InvalidTestExports, ValidTestExports } from "./tests";

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
}: ValidTestExports<unknown, unknown>) {
  const { value, error } = validate(inputValue, spec);
  expect(error).toBeNull();
  expect(value).toEqual(inputValue);
}

function invalidTest({
  spec,
  value: inputValue,
  error: ctx,
}: InvalidTestExports<unknown, unknown>) {
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
