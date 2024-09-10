import { render, screen } from "@testing-library/react";
import "jest-styled-components";
import { ThemeProvider } from "styled-components";
import { IconButton } from "../";
import { theme } from "~/styles/theme";

describe("IconButton component", () => {
  it("should render the IconButton with default props", () => {
    render(
      <ThemeProvider theme={theme}>
        <IconButton>
          <svg>Icon</svg>
        </IconButton>
      </ThemeProvider>
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyleRule(
      "border",
      `2px solid ${theme.colors.primary}`
    );
    expect(button).toHaveStyleRule("padding", theme.spacing.small);
    expect(button).toHaveStyleRule("border-radius", theme.borderRadius);

    const svg = screen.getByText("Icon");
    expect(svg).toHaveStyle(`color: ${theme.colors.primary}`);
  });

  it("should render the IconButton with custom colors", () => {
    render(
      <ThemeProvider theme={theme}>
        <IconButton color="#ff0000">
          <svg>Icon</svg>
        </IconButton>
      </ThemeProvider>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveStyleRule("border", "2px solid #ff0000");

    const svg = screen.getByText("Icon");
    expect(svg).toHaveStyle(`color: #ff0000`);
  });

  it("should apply hover styles correctly", () => {
    render(
      <ThemeProvider theme={theme}>
        <IconButton color="#ff0000">
          <svg>Icon</svg>
        </IconButton>
      </ThemeProvider>
    );
    const button = screen.getByRole("button");

    expect(button).toHaveStyleRule("background-color", "#ff000020", {
      modifier: ":hover",
    });
  });

  it("should render the IconButton with default hover styles", () => {
    render(
      <ThemeProvider theme={theme}>
        <IconButton>
          <svg>Icon</svg>
        </IconButton>
      </ThemeProvider>
    );
    const button = screen.getByRole("button");

    expect(button).toHaveStyleRule(
      "background-color",
      `${theme.colors.primary}20`,
      {
        modifier: ":hover",
      }
    );
  });
});
