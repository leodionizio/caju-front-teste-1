import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BackButton } from "../";
import { useHistory } from "react-router-dom";
import { render } from "~/utils/test-utils";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

describe("BackButton component", () => {
  it("should render the IconButton with an arrow icon", () => {
    render(<BackButton />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });

  it("should call history.goBack when clicked", () => {
    const goBackMock = jest.fn();

    (useHistory as jest.Mock).mockReturnValue({
      goBack: goBackMock,
    });

    render(<BackButton />);

    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(goBackMock).toHaveBeenCalledTimes(1);
  });
});
