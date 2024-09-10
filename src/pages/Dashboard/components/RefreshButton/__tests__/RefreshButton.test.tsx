import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RefreshButton } from "../";
import { useRegistration } from "~/hooks/useRegistration";
import { ThemeProvider } from "styled-components";
import { theme } from "~/styles/theme";

jest.mock("~/hooks/useRegistration");

describe("RefreshButton component", () => {
  const getRegistrationsMock = jest.fn();

  beforeEach(() => {
    (useRegistration as jest.Mock).mockReturnValue({
      getRegistrations: getRegistrationsMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the RefreshButton", () => {
    render(
      <ThemeProvider theme={theme}>
        <RefreshButton />
      </ThemeProvider>
    );

    const button = screen.getByRole("button", { name: /refetch/i });
    expect(button).toBeInTheDocument();

    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });

  it("should call getRegistrations when the button is clicked", () => {
    render(
      <ThemeProvider theme={theme}>
        <RefreshButton />
      </ThemeProvider>
    );

    const button = screen.getByRole("button", { name: /refetch/i });
    userEvent.click(button);
    expect(getRegistrationsMock).toHaveBeenCalledTimes(1);
  });
});
