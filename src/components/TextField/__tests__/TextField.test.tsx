import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "jest-styled-components";
import TextField from "../";
import { render } from "~/utils/test-utils";

describe("TextField component", () => {
  it("should render the label and input field", () => {
    render(<TextField id="test-input" label="Label Teste" />);

    const label = screen.getByText("Label Teste");
    const input = screen.getByLabelText("Label Teste");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it("should render with a mask", async () => {
    render(<TextField id="input" label="CPF" mask="___.___.___-__" />);

    const input = screen.getByLabelText("CPF");

    await userEvent.type(input, "12345678901", { delay: 1 });

    await waitFor(() => {
      expect(input).toHaveValue("123.456.789-01");
    });
  });

  it("should render without a mask", async () => {
    render(<TextField id="input" label="Nome" />);

    const input = screen.getByLabelText("Nome");
    await userEvent.type(input, "Leonardo");

    expect(input).toHaveValue("Leonardo");
  });

  it("should display an error message when error is present", () => {
    render(<TextField id="input" label="CPF" error="CPF inválido" />);

    const errorMessage = screen.getByText("CPF inválido");
    expect(errorMessage).toBeInTheDocument();
  });
});
