import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "@/app/signup/page";
import { AuthProvider } from "@/contexts/AuthContext";
import { authService } from "@/service/auth/auth";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

jest.mock("@/service/auth/auth", () => ({
    authService: {
        signUp: jest.fn(),
    },
}));

describe("Integration - Sign Up BUG", () => {
    const push = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push });
        jest.clearAllMocks();
    });

    it("BUG - should allow signup with valid 8-char password", async () => {
        (authService.signUp as jest.Mock).mockResolvedValue({
            id: 1,
            email: "user@test.com",
        });

        render(
            <AuthProvider>
                <SignUp />
            </AuthProvider>
        );

        fireEvent.change(screen.getByPlaceholderText("seu@email.com"), {
            target: { value: "user@test.com" },
        });

        const inputs = screen.getAllByPlaceholderText("••••••••");

        fireEvent.change(inputs[0], {
            target: { value: "Abc123@!" },
        });

        fireEvent.change(inputs[1], {
            target: { value: "Abc123@!" },
        });

        fireEvent.submit(screen.getByTestId("signup-form"));

        // BUG ASSERTION (vai falhar)
        await waitFor(() => {
            expect(authService.signUp).toHaveBeenCalled();
        });

        await waitFor(() => {
            expect(push).toHaveBeenCalledWith("/");
        });
    });
});