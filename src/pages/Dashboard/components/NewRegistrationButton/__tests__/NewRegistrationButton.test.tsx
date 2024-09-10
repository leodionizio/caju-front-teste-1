import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { NewRegistrationButton } from "../";
import routes from "~/router/routes";
import { ThemeProvider } from "styled-components";
import { theme } from "~/styles/theme";

describe("NewRegistrationButton component", () => {
  it("should render the button", () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <NewRegistrationButton />
        </ThemeProvider>
      </Router>
    );

    const button = screen.getByRole("button", { name: /nova admissão/i });
    expect(button).toBeInTheDocument();
  });

  it("should navigate to newRegistration page when the button is clicked", () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <NewRegistrationButton />
        </ThemeProvider>
      </Router>
    );

    const button = screen.getByRole("button", { name: /nova admissão/i });
    userEvent.click(button);
    expect(history.location.pathname).toBe(routes.newRegistration);
  });
});
