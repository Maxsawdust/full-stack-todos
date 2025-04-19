import { render, screen, waitFor } from "@testing-library/react";
import Signup from "../pages/Signup";
import { Provider } from "react-redux";
import store from "../store/store";
import userEvent from "@testing-library/user-event";

// Mock the useNavigate hook from react-router
// This tracks when navigation occurs without actually navigating
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  ...vi.importActual("react-router"),
  useNavigate: () => mockNavigate,
}));

// Mock fetch
const mockFetch = vi.fn();
window.fetch = mockFetch;

// Mock Redux store
const mockDispatch = vi.fn();
vi.mock("../store/hooks/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => ({ isLoading: false }),
}));

describe("Signup Tests", () => {
  // Helper function to set up the test environment
  const setup = () => {
    // Configure fetch mock to return a successful response
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: "Success" }),
    });

    // Render the Signup component with necessary providers
    render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );
  };

  // Test that the signup page renders correctly
  it("should render the signup page", () => {
    setup();
    // Compare the rendered component to a snapshot
    expect(<Signup />).toMatchSnapshot();
  });

  it("should navigate to login on singup", async () => {
    setup();

    // Get form elements by their placeholder text
    const usernameField = screen.getByPlaceholderText("Username");
    const emailField = screen.getByPlaceholderText("Email");
    const passwordField = screen.getByPlaceholderText("Password");
    const confirmPasswordField =
      screen.getByPlaceholderText("Confirm Password");
    const signupButton = screen.getByTestId("Sign Up");

    // Fill in the form with valid data
    await userEvent.type(usernameField, "testuser");
    await userEvent.type(emailField, "testuser@example.com");
    await userEvent.type(passwordField, "Password1!");
    await userEvent.type(confirmPasswordField, "Password1!");

    // Submit the form
    await userEvent.click(signupButton);

    // Verify that the fetch API was called with the correct parameters
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:5000/users/signup",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: expect.any(String),
        })
      );
    });

    // Verify that navigation to the login page occurred
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
