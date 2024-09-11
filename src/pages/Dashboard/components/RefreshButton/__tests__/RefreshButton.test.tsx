import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RefreshButton } from "../";
import { useRegistration } from "~/hooks/useRegistration";
import { render } from "~/utils/test-utils";

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
    render(<RefreshButton />);

    const button = screen.getByRole("button", { name: /refetch/i });
    expect(button).toBeInTheDocument();

    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });

  it("should call getRegistrations when the button is clicked", async () => {
    render(<RefreshButton />);

    const button = screen.getByRole("button", { name: /refetch/i });
    await userEvent.click(button);
    expect(getRegistrationsMock).toHaveBeenCalledTimes(1);
  });
});
