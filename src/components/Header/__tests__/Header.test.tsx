import { render, screen } from "@testing-library/react";
import "jest-styled-components";
import { ThemeProvider } from "styled-components";
import { Header } from "../";
import { theme } from "~/styles/theme";

describe("Header component", () => {
  it("should render the header with the correct styles", () => {
    render(
      <ThemeProvider theme={theme}>
        <Header>
          <h1>Test Header</h1>
        </Header>
      </ThemeProvider>
    );
    const header = screen.getByText("Test Header").closest("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveStyleRule(
      "background",
      "linear-gradient(258deg,rgba(255, 117, 0, 1) 8%,rgba(232, 5, 55, 1) 53%)"
    );
    expect(header).toHaveStyleRule("height", "64px");
  });
});
