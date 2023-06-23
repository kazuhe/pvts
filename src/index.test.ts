import { vi, describe, test, expect, beforeEach } from "vitest";
import { isString, isNotEmpty, validateOrThrow, pvts } from "@/index";

describe("isString", () => {
  test.each([
    ["", true],
    ["0", true],
    ["false", true],
    ["undefined", true],
    ["null", true],
    [0, false],
    [1, false],
    [true, false],
    [false, false],
    [undefined, false],
    [null, false],
  ])("引数が '%s' のとき、'%s' を返すこと", (value, expected) => {
    expect(isString(value)).toBe(expected);
  });
});

describe("isNotEmpty", () => {
  test.each([
    [-1, true],
    [0, true],
    [1, true],
    [true, true],
    [false, true],
    ["0", true],
    ["false", true],
    ["undefined", true],
    ["null", true],
    [undefined, false],
    [null, false],
    ["", false],
  ])("引数が '%s' のとき、'%s' を返すこと", (value, expected) => {
    expect(isNotEmpty(value)).toBe(expected);
  });
});

describe("validateOrThrow", () => {
  const ERROR_MESSAGE = "Error Message";
  const validatorMock = vi.fn();

  beforeEach(() => {
    validatorMock.mockClear();
  });

  test("検証関数が true を返したとき、渡された値をそのまま返すこと", () => {
    validatorMock.mockReturnValue(true);
    const validate = validateOrThrow(validatorMock, ERROR_MESSAGE);

    expect(validate("foo")).toBe("foo");
    expect(validatorMock).toHaveBeenCalledWith("foo");
  });

  test("検証関数が false を返したとき、エラーを throw すること", () => {
    validatorMock.mockReturnValue(false);
    const validate = validateOrThrow(validatorMock, ERROR_MESSAGE);

    expect(() => validate("foo")).toThrowError(ERROR_MESSAGE);
    expect(validatorMock).toHaveBeenCalledWith("foo");
  });
});

describe("pvts", () => {
  test("boolean を返すバリデーション関数", () => {
    const validator = pvts().string().required().create();

    expect(validator("foo")).toBe(true);
    expect(validator("")).toBe(false);
    expect(validator(9)).toBe(false);
    expect(validator(null)).toBe(false);
    expect(validator()).toBe(false);
  });

  test("エラーメッセージを返すバリデーション関数", () => {
    const validator = pvts()
      .string("文字列を入力してください。")
      .required("値を入力してください。")
      .create("Message");

    expect(validator("foo")).toBe("");
    expect(validator("")).toBe("値を入力してください。");
    expect(validator(9)).toBe("文字列を入力してください。");
    expect(validator(null)).toBe("文字列を入力してください。");
    expect(validator()).toBe("文字列を入力してください。");
  });
});
