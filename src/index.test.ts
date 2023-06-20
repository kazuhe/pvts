import { describe, test, expect } from "vitest";
import { hello } from "@/index";

describe("hello", () => {
  test("returns 'Hello World!'", () => {
    expect(hello()).toBe("Hello World!");
  });
});
