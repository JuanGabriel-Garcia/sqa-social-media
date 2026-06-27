import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignInPage from "@/app/signin/page";
import { AuthProvider } from "@/contexts/AuthContext";
import { authService } from "@/service/auth/auth";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

jest.mock("@/service/auth/auth", () => ({
    authService: {
        signIn: jest.fn(),
    },
}));

describe("Integration - Sign In", () => {
    const push = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push });
        jest.clearAllMocks();
    });

    it("should sign in and redirect", async () => {
        (authService.signIn as jest.Mock).mockResolvedValue({
            id: 1,
            email: "user@test.com",
        });

        render(
            <AuthProvider>
                <SignInPage />
            </AuthProvider>
        );

        fireEvent.change(screen.getByPlaceholderText("seu@email.com"), {
            target: { value: "user@test.com" },
        });

        fireEvent.change(screen.getByPlaceholderText("••••••••"), {
            target: { value: "Password123@" },
        });

        fireEvent.submit(screen.getByTestId("signin-form"));

        await waitFor(() => {
            expect(authService.signIn).toHaveBeenCalled();
        });

        await waitFor(() => {
            expect(push).toHaveBeenCalledWith("/");
        });
    });
});