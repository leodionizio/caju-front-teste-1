import { render, screen } from "@testing-library/react";
import "jest-styled-components";
import Columns from "../";
import { Registration } from "~/types/registration";

jest.mock("../../Column", () => ({
  __esModule: true,
  Column: ({
    title,
    registrations,
  }: {
    title: string;
    registrations: any[];
  }) => (
    <div data-testid="column">
      <h2>{title}</h2>
      {registrations?.map((registration) => (
        <div key={registration.id} data-testid="registration-card">
          {registration.name}
        </div>
      ))}
    </div>
  ),
}));

describe("Columns component", () => {
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
    {
      id: "3",
      employeeName: "Mark Johnson",
      email: "mark@example.com",
      cpf: "111.222.333-44",
      admissionDate: "2023-07-20",
      status: "REPROVED",
    },
  ];

  it("should render the correct number of columns", () => {
    render(<Columns registrations={mockRegistrations} />);

    const columns = screen.getAllByTestId("column");
    expect(columns).toHaveLength(3);
  });
});
