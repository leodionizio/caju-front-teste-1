import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfirmationModal } from "../";
import { ConfirmationDialogContext } from "~/contexts/confirmationDialogContext";
import { useConfirmationDialog } from "~/hooks/useConfirmationDialog";
import { render } from "~/utils/test-utils";

jest.mock("~/hooks/useConfirmationDialog", () => ({
  useConfirmationDialog: jest.fn(),
}));

describe("ConfirmationModal component", () => {
  const closeDialogMock = jest.fn();
  const confirmActionMock = jest.fn();
  const cancelActionMock = closeDialogMock;
  const setShowMock = jest.fn();
  const setDialogOptionsMock = jest.fn();
  const dialogOptionsMock = {
    title: "Titulo",
    text: "Mensagem",
    confirmAction: confirmActionMock,
    cancelAction: cancelActionMock,
  };

  const providerValueMock = {
    show: false,
    setShow: setShowMock,
    dialogOptions: dialogOptionsMock,
    setDialogOptions: setDialogOptionsMock,
  };

  beforeEach(() => {
    (useConfirmationDialog as jest.Mock).mockReturnValue({
      closeDialog: closeDialogMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not render the modal when `show` is false", () => {
    render(
      <ConfirmationDialogContext.Provider value={providerValueMock}>
        <ConfirmationModal />
      </ConfirmationDialogContext.Provider>
    );

    const modalTitle = screen.queryByText("Test Title");
    expect(modalTitle).not.toBeInTheDocument();
  });

  it("should render the modal when `show` is true", () => {
    render(
      <ConfirmationDialogContext.Provider
        value={{
          ...providerValueMock,
          show: true,
        }}
      >
        <ConfirmationModal />
      </ConfirmationDialogContext.Provider>
    );

    const modalTitle = screen.getByText("Titulo");
    const modalText = screen.getByText("Mensagem");
    expect(modalTitle).toBeInTheDocument();
    expect(modalText).toBeInTheDocument();
  });

  it("should call the confirmAction and closeDialog when confirming", async () => {
    render(
      <ConfirmationDialogContext.Provider
        value={{
          ...providerValueMock,
          show: true,
        }}
      >
        <ConfirmationModal />
      </ConfirmationDialogContext.Provider>
    );

    const confirmButton = screen.getByText("Confirmar");
    await userEvent.click(confirmButton);

    expect(confirmActionMock).toHaveBeenCalledTimes(1);
    expect(closeDialogMock).toHaveBeenCalledTimes(1);
  });

  it("should call the cancelAction and closeDialog when canceling", async () => {
    render(
      <ConfirmationDialogContext.Provider
        value={{
          ...providerValueMock,
          show: true,
        }}
      >
        <ConfirmationModal />
      </ConfirmationDialogContext.Provider>
    );

    const cancelButton = screen.getByText("Cancelar");
    await userEvent.click(cancelButton);

    expect(cancelActionMock).toHaveBeenCalledTimes(1);
    expect(closeDialogMock).toHaveBeenCalledTimes(1);
  });

  it("should call only closeDialog when canceling if no cancelAction is provided", async () => {
    render(
      <ConfirmationDialogContext.Provider
        value={{
          ...providerValueMock,
          show: true,
        }}
      >
        <ConfirmationModal />
      </ConfirmationDialogContext.Provider>
    );

    const cancelButton = screen.getByText("Cancelar");
    await userEvent.click(cancelButton);

    expect(closeDialogMock).toHaveBeenCalledTimes(1);
  });

  it("should close the modal when clicking the close icon", async () => {
    render(
      <ConfirmationDialogContext.Provider
        value={{
          ...providerValueMock,
          show: true,
        }}
      >
        <ConfirmationModal />
      </ConfirmationDialogContext.Provider>
    );

    const closeIcon = screen.getByTestId("closeButton");
    await userEvent.click(closeIcon);

    expect(closeDialogMock).toHaveBeenCalledTimes(1);
  });
});
