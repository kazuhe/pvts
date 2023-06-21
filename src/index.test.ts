import { describe, test, expect } from "vitest";
import { isString, isRequired, pvts } from "@/index";

describe("isString", () => {
  const ERROR_MESSAGE = "Error Message";
  const string = isString(ERROR_MESSAGE);

  test.each([
    ["", ""],
    ["0", "0"],
    ["false", "false"],
    ["undefined", "undefined"],
    ["null", "null"],
  ])("引数が '%s' のとき、'%s' を返していること", (value, expected) => {
    expect(string(value)).toBe(expected);
  });

  test.each([[1], [true], [undefined], [null]])(
    "引数が '%s' のとき、エラーを throw していること",
    (value) => {
      expect(() => string(value)).toThrowError(ERROR_MESSAGE);
    }
  );
});

describe("isRequired", () => {
  const ERROR_MESSAGE = "Error Message";
  const required = isRequired(ERROR_MESSAGE);

  test.each([
    [-1, -1],
    [0, 0],
    [1, 1],
    [true, true],
    [false, false],
    ["0", "0"],
    ["false", "false"],
    ["undefined", "undefined"],
    ["null", "null"],
  ])("引数が '%s' のとき、'%s' を返していること", (value, expected) => {
    expect(required(value)).toBe(expected);
  });

  test.each([[undefined], [null], [""]])(
    "引数が '%s' のとき、エラーを throw していること",
    (value) => {
      expect(() => required(value)).toThrowError(ERROR_MESSAGE);
    }
  );
});

describe("pvts", () => {
  test("string() と required() のチェーン", () => {
    const validator = pvts()
      .string("文字列を入力してください。")
      .required("値を入力してください。")
      .test();

    expect(validator("foo")).toBe(true);
    expect(validator("")).toBe(false);
    expect(validator(9)).toBe(false);
    expect(validator(null)).toBe(false);
    expect(validator()).toBe(false);
  });
});
