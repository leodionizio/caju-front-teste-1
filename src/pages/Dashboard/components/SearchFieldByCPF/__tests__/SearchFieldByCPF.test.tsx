import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchFieldByCPF } from "../";
import { useRegistration } from "~/hooks/useRegistration";
import { isValid } from "@fnando/cpf";
import { render } from "~/utils/test-utils";

jest.mock("~/hooks/useRegistration", () => ({
  useRegistration: jest.fn(),
}));

jest.mock("@fnando/cpf", () => ({
  isValid: jest.fn(),
  strip: jest.fn((cpf) => cpf.replace(/\D/g, "")),
}));

describe("SearchFieldByCPF component", () => {
  const getRegistrationsMock = jest.fn();

  beforeEach(() => {
    (useRegistration as jest.Mock).mockReturnValue({
      getRegistrations: getRegistrationsMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the search field", () => {
    render(<SearchFieldByCPF />);

    const input = screen.getByPlaceholderText("Buscar pelo CPF");
    expect(input).toBeInTheDocument();
  });

  it("should display an error message for invalid CPF", async () => {
    (isValid as jest.Mock).mockReturnValue(false);

    render(<SearchFieldByCPF />);

    const input = screen.getByPlaceholderText("Buscar pelo CPF");
    userEvent.type(input, "123.456.789-00");

    await waitFor(() => {
      expect(screen.getByText("O CPF digitado é inválido")).toBeInTheDocument();
    });

    expect(getRegistrationsMock).not.toHaveBeenCalled();
  });

  it("should call getRegistrations for a valid CPF", async () => {
    (isValid as jest.Mock).mockReturnValue(true);

    render(<SearchFieldByCPF />);

    const input = screen.getByPlaceholderText("Buscar pelo CPF");
    await userEvent.type(input, "123.456.789-09", { delay: 1 });

    await waitFor(() => {
      expect(getRegistrationsMock).toHaveBeenCalledWith({ cpf: "12345678909" });
    });
  });

  it("should not call getRegistrations when CPF is invalid", async () => {
    (isValid as jest.Mock).mockReturnValue(true);

    render(<SearchFieldByCPF />);

    const input = screen.getByPlaceholderText("Buscar pelo CPF");

    await userEvent.type(input, "123", { delay: 1 });

    expect(getRegistrationsMock).not.toHaveBeenCalled();
  });

  it("should cancel debounce when component unmounts", () => {
    const { unmount } = render(<SearchFieldByCPF />);

    const input = screen.getByPlaceholderText("Buscar pelo CPF");
    userEvent.type(input, "123");

    unmount();

    expect(getRegistrationsMock).not.toHaveBeenCalled();
  });
});
