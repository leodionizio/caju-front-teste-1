import { screen } from "@testing-library/react";
import { RegistrationCard } from "../";
import { useRegistration } from "~/hooks/useRegistration";
import { useConfirmationDialog } from "~/hooks/useConfirmationDialog";
import { render } from "~/utils/test-utils";
import { Registration } from "~/types/registration";
import userEvent from "@testing-library/user-event";

jest.mock("~/hooks/useRegistration");
jest.mock("~/hooks/useConfirmationDialog");

describe("RegistrationCard component", () => {
  const mockUpdateRegistration = jest.fn();
  const mockDeleteRegistration = jest.fn();
  const mockShowDialog = jest.fn();

  const registrationMock: Registration = {
    id: "1",
    employeeName: "John Doe",
    cpf: "41649864841",
    email: "john@example.com",
    admissionDate: "2023-09-01",
    status: "REVIEW",
  };

  beforeEach(() => {
    (useRegistration as jest.Mock).mockReturnValue({
      updateRegistration: mockUpdateRegistration,
      deleteRegistration: mockDeleteRegistration,
    });

    (useConfirmationDialog as jest.Mock).mockReturnValue({
      showDialog: mockShowDialog,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render registration details", () => {
    render(<RegistrationCard registration={registrationMock} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("2023-09-01")).toBeInTheDocument();
  });

  it("should render the action buttons based on the registration status", () => {
    render(<RegistrationCard registration={registrationMock} />);

    const approveButton = screen.getByText("Aprovar");
    const reproveButton = screen.getByText("Reprovar");
    const reviewAgainButton = screen.queryByText("Revisar novamente");

    expect(approveButton).toBeInTheDocument();
    expect(reproveButton).toBeInTheDocument();
    expect(reviewAgainButton).not.toBeInTheDocument();
  });

  it("should show confirmation dialog when approve is clicked", async () => {
    render(<RegistrationCard registration={registrationMock} />);

    const approveButton = screen.getByText("Aprovar");
    await userEvent.click(approveButton);

    expect(mockShowDialog).toHaveBeenCalledWith({
      title: "Aprovar John Doe",
      text: "Tem certeza que deseja aprovar John Doe?",
      confirmAction: expect.any(Function),
    });
  });

  it("should show confirmation dialog when reprove is clicked", async () => {
    render(<RegistrationCard registration={registrationMock} />);

    const reproveButton = screen.getByText("Reprovar");
    await userEvent.click(reproveButton);

    expect(mockShowDialog).toHaveBeenCalledWith({
      title: "Reprovar John Doe",
      text: "Tem certeza que deseja reprovar John Doe?",
      confirmAction: expect.any(Function),
    });
  });

  it("should show confirmation dialog when delete is clicked", async () => {
    render(<RegistrationCard registration={registrationMock} />);

    const deleteIcon = screen.getByTestId("delete-icon");
    await userEvent.click(deleteIcon);

    expect(mockShowDialog).toHaveBeenCalledWith({
      title: "Deletar John Doe",
      text: "Tem certeza que deseja deleter John Doe?",
      confirmAction: expect.any(Function),
    });
  });

  it("should call updateRegistration with correct status when approve is confirmed", async () => {
    render(<RegistrationCard registration={registrationMock} />);

    const approveButton = screen.getByText("Aprovar");
    await userEvent.click(approveButton);

    const confirmAction = mockShowDialog.mock.calls[0][0].confirmAction;
    confirmAction();

    expect(mockUpdateRegistration).toHaveBeenCalledWith(
      registrationMock,
      "APPROVED"
    );
  });

  it("should call deleteRegistration when delete is confirmed", async () => {
    render(<RegistrationCard registration={registrationMock} />);

    const deleteIcon = screen.getByTestId("delete-icon");
    await userEvent.click(deleteIcon);

    const confirmAction = mockShowDialog.mock.calls[0][0].confirmAction;
    confirmAction();

    expect(mockDeleteRegistration).toHaveBeenCalledWith(registrationMock);
  });
});
