import { jest } from "@jest/globals";
import { logError } from "./logger";

describe("logError", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("calls console.error with the provided error", () => {
    const testError = new Error("Test error");
    logError(testError);
    expect(console.error).toHaveBeenCalledWith(testError);
  });

  it("calls console.error with the correct message", () => {
    const anotherMessage = "Another test error";
    logError(anotherMessage);
    expect(console.error).toHaveBeenCalledWith(anotherMessage);
  });
});
