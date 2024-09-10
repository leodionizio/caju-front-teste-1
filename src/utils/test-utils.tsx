import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "~/styles/theme";

const customRender = (component: React.ReactElement, options = {}) => {
  return render(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>,
    options
  );
};

export * from "@testing-library/react";
export { customRender as render };
