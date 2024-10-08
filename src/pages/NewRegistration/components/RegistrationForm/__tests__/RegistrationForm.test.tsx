import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "jest-styled-components";
import { RegistrationForm } from "../";
import { render } from "~/utils/test-utils";

describe("RegistrationForm component", () => {
  const onSubmitMock = jest.fn();

  beforeEach(() => {
    onSubmitMock.mockClear();
  });

  it("should render the form with all fields", () => {
    render(<RegistrationForm onSubmit={onSubmitMock} />);

    const nameInput = screen.getByLabelText("Nome Completo");
    const emailInput = screen.getByLabelText("E-mail");
    const cpfInput = screen.getByLabelText("CPF");
    const admissionDateInput = screen.getByLabelText("Data de admissão");
    const submitButton = screen.getByRole("button", { name: /cadastrar/i });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(cpfInput).toBeInTheDocument();
    expect(admissionDateInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should show error message for invalid email", async () => {
    render(<RegistrationForm onSubmit={onSubmitMock} />);

    const emailInput = screen.getByLabelText("E-mail");
    await userEvent.type(emailInput, "invalid-email");

    const submitButton = screen.getByRole("button", { name: /cadastrar/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("O e-mail inserido é inválido")
      ).toBeInTheDocument();
    });
  });

  it("should show error message for invalid CPF", async () => {
    render(<RegistrationForm onSubmit={onSubmitMock} />);

    const cpfInput = screen.getByLabelText("CPF");
    await userEvent.type(cpfInput, "123.456.789-00");

    const submitButton = screen.getByRole("button", { name: /cadastrar/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("O CPF inserido é inválido")).toBeInTheDocument();
    });
  });

  it("should submit form with valid data", async () => {
    render(<RegistrationForm onSubmit={onSubmitMock} />);

    const nameInput = screen.getByLabelText("Nome Completo");
    const emailInput = screen.getByLabelText("E-mail");
    const cpfInput = screen.getByLabelText("CPF");
    const admissionDateInput = screen.getByLabelText("Data de admissão");

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "johndoe@example.com");
    await userEvent.type(cpfInput, "12345678909", { delay: 1 });
    await userEvent.type(admissionDateInput, "2024-10-21", { delay: 1 });

    const submitButton = screen.getByRole("button", { name: /cadastrar/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });
  });

  it("should disable the submit button if the form is invalid", () => {
    render(<RegistrationForm onSubmit={onSubmitMock} />);

    const submitButton = screen.getByRole("button", { name: /cadastrar/i });
    expect(submitButton).toBeDisabled();
  });
});
