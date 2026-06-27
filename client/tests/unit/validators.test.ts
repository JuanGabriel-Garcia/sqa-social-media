import { isEmailValid, getEmailValidationMessage } from "@/utils/email";
import { isPasswordValid } from "@/utils/password";

describe("Utils - Validators", () => {
  it("should validate a correct email", () => {
    expect(isEmailValid("test@example.com")).toBe(true);
  });

  it("should invalidate a weak password", () => {
    expect(isPasswordValid("abc")).toBe(false);
  });
});