import { screen } from "@testing-library/react";
import "jest-styled-components";
import { Column } from "../";
import { Registration } from "~/types/registration";
import { render } from "~/utils/test-utils";

describe("Column component", () => {
  const mockRegistrations: Registration[] = [
    {
      id: "1",
      employeeName: "John Doe",
      email: "john@example.com",
      cpf: "123.456.789-10",
      admissionDate: "2023-09-01",
      status: "APPROVED",
    },
    {
      id: "2",
      employeeName: "Jane Smith",
      email: "jane@example.com",
      cpf: "987.654.321-00",
      admissionDate: "2023-08-15",
      status: "REVIEW",
    },
  ];

  it("should render the column title", () => {
    render(<Column title="Aprovados" status="APPROVED" />);

    const columnTitle = screen.getByText("Aprovados");
    expect(columnTitle).toBeInTheDocument();
  });

  it("should render the correct number of RegistrationCards", () => {
    render(
      <Column
        title="Pronto para revisar"
        status="REVIEW"
        registrations={mockRegistrations}
      />
    );

    const registrationCards = screen.getAllByTestId("registration-card");
    expect(registrationCards).toHaveLength(2);
  });
});
