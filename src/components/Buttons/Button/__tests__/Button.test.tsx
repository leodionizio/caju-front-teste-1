import { screen } from "@testing-library/react";
import "jest-styled-components";
import { Button } from "../";
import { render } from "~/utils/test-utils";
import { theme } from "~/styles/theme";

describe("Button component", () => {
  it("should renders the button with default props", () => {
    render(<Button>Botao Teste</Button>);
    const button = screen.getByText("Botao Teste");
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyleRule("color", theme.colors.textLight);
    expect(button).toHaveStyleRule("background-color", theme.colors.primary);
  });

  it("should renders the button with custom colors", () => {
    render(
      <Button bgcolor="#ff0000" color="#ffffff">
        Botao Teste
      </Button>
    );
    const button = screen.getByText("Botao Teste");
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyleRule("background-color", "#ff0000");
    expect(button).toHaveStyleRule("color", "#ffffff");
  });

  it('should renders the button applying the "small" size', () => {
    render(<Button size="small">Botao Teste</Button>);
    const button = screen.getByText("Botao Teste");
    expect(button).toHaveStyleRule("padding", "6px 16px");
    expect(button).toHaveStyleRule("font-size", "14px");
  });

  it('should renders the button applying the "large" size by default', () => {
    render(<Button>Botao Teste</Button>);
    const button = screen.getByText("Botao Teste");
    expect(button).toHaveStyleRule("padding", "12px 32px");
    expect(button).toHaveStyleRule("font-size", "16px");
  });

  it("should renders the disabled button", () => {
    render(<Button disabled>Botao Teste</Button>);
    const button = screen.getByText("Botao Teste");
    expect(button).toBeDisabled();
    expect(button).toHaveStyleRule("background-color", "#cccccc");
    expect(button).toHaveStyleRule("cursor", "not-allowed");
  });
});
