import { render, screen, fireEvent } from "@testing-library/react";
import Input from "@/components/Input";
import "@testing-library/jest-dom";

describe("Component - Input", () => {
    it("should update value on change", () => {
        render(<Input placeholder="email" />);

        const input = screen.getByPlaceholderText("email") as HTMLInputElement;

        fireEvent.change(input, { target: { value: "abc@test.com" } });

        expect(input.value).toBe("abc@test.com");
    });
});