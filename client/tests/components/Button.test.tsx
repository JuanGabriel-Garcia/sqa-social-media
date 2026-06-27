import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/Button";
import "@testing-library/jest-dom";

describe("Component - Button", () => {
    it("should call onClick when clicked", () => {
        const handleClick = jest.fn();

        render(<Button onClick={handleClick}>Click</Button>);

        fireEvent.click(screen.getByText("Click"));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});