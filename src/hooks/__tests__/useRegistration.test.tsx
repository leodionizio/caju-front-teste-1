import { renderHook, act, waitFor } from "@testing-library/react";
import { useRegistration } from "../useRegistration";
import { RegistrationsContext } from "~/contexts/registrationsContext";
import { RegistrationService } from "~/services/registration";
import { useToastify } from "~/hooks/useToastify";
import { useLoader } from "~/hooks/useLoader";
import { Registration } from "~/types/registration";


jest.mock("~/services/registration");
jest.mock("~/hooks/useToastify");
jest.mock("~/hooks/useLoader");

describe("useRegistration hook", () => {
  const setRegistrationsMock = jest.fn();
  const toastMock = { success: jest.fn(), error: jest.fn() };
  const showLoaderMock = jest.fn();
  const hideLoaderMock = jest.fn();

  const registrationsMock: Registration[] = [
    {
      id: "1",
      admissionDate: "22/10/2023",
      email: "filipe@caju.com.br",
      employeeName: "Filipe Marins",
      status: "APPROVED",
      cpf: "78502270001",
    },
    {
      id: "59b9",
      employeeName: "Leonardo Dionizio",
      email: "leonardo.dionizio@caju.com.br",
      cpf: "416.498.648-41",
      admissionDate: "2024-09-18",
      status: "REVIEW",
    },
  ];

  beforeEach(() => {
    (useToastify as jest.Mock).mockReturnValue({ toast: toastMock });
    (useLoader as jest.Mock).mockReturnValue({
      showLoader: showLoaderMock,
      hideLoader: hideLoaderMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RegistrationsContext.Provider
      value={{
        registrations: registrationsMock,
        setRegistrations: setRegistrationsMock,
      }}
    >
      {children}
    </RegistrationsContext.Provider>
  );

  it("should fetch registrations successfully", async () => {
    (RegistrationService.getRegistrations as jest.Mock).mockResolvedValue(
      registrationsMock
    );

    const { result } = renderHook(() => useRegistration(), {
      wrapper,
    });

    act(() => {
      result.current.getRegistrations();
    });

    await waitFor(() => {
      expect(showLoaderMock).toHaveBeenCalled();
      expect(RegistrationService.getRegistrations).toHaveBeenCalled();
      expect(setRegistrationsMock).toHaveBeenCalledWith(registrationsMock);
      expect(hideLoaderMock).toHaveBeenCalled();
    });
  });

  it("should handle error while fetching registrations", async () => {
    (RegistrationService.getRegistrations as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );

    const { result } = renderHook(() => useRegistration(), {
      wrapper,
    });

    act(() => {
      result.current.getRegistrations();
    });

    await waitFor(() => {
      expect(showLoaderMock).toHaveBeenCalled();
      expect(RegistrationService.getRegistrations).toHaveBeenCalled();
      expect(toastMock.error).toHaveBeenCalledWith("API Error");
      expect(hideLoaderMock).toHaveBeenCalled();
    });
  });

  it("should create a registration successfully", async () => {
    (RegistrationService.createRegistration as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useRegistration(), { wrapper });

    await act(async () => {
      await result.current.createRegistration({
        employeeName: "John Doe",
        email: "john@example.com",
        cpf: "123.456.789-00",
        admissionDate: "2023-09-01",
      });
    });

    expect(showLoaderMock).toHaveBeenCalled();
    expect(RegistrationService.createRegistration).toHaveBeenCalled();
    expect(toastMock.success).toHaveBeenCalledWith(
      "Admissão criada com sucesso!"
    );
    expect(hideLoaderMock).toHaveBeenCalled();
  });

  it("should handle error while creating a registration", async () => {
    (RegistrationService.createRegistration as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );

    const { result } = renderHook(() => useRegistration(), { wrapper });

    await act(async () => {
      await result.current.createRegistration({
        employeeName: "John Doe",
        email: "john@example.com",
        cpf: "123.456.789-00",
        admissionDate: "2023-09-01",
      });
    });

    expect(showLoaderMock).toHaveBeenCalled();
    expect(RegistrationService.createRegistration).toHaveBeenCalled();
    expect(toastMock.error).toHaveBeenCalledWith("API Error");
    expect(hideLoaderMock).toHaveBeenCalled();
  });

  it("should update a registration successfully", async () => {
    const updatedRegistration = { ...registrationsMock[0], status: "APPROVED" };

    (RegistrationService.updateRegistration as jest.Mock).mockResolvedValue(
      updatedRegistration
    );

    setRegistrationsMock.mockImplementation((callback) => {
      const updatedRegistrations = callback(registrationsMock);

      expect(updatedRegistrations).toEqual([
        updatedRegistration,
        registrationsMock[1],
      ]);
    });

    const { result } = renderHook(() => useRegistration(), { wrapper });

    await act(async () => {
      await result.current.updateRegistration(registrationsMock[0], "APPROVED");
    });

    expect(RegistrationService.updateRegistration).toHaveBeenCalledWith(
      registrationsMock[0],
      "APPROVED"
    );

    expect(setRegistrationsMock).toHaveBeenCalled();
    expect(toastMock.success).toHaveBeenCalledWith(
      "Admissão atualizada com sucesso!"
    );
  });

  it("should handle error while updating a registration", async () => {
    (RegistrationService.updateRegistration as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );

    const { result } = renderHook(() => useRegistration(), { wrapper });

    await act(async () => {
      await result.current.updateRegistration(registrationsMock[0], "APPROVED");
    });

    expect(showLoaderMock).toHaveBeenCalled();
    expect(RegistrationService.updateRegistration).toHaveBeenCalled();
    expect(toastMock.error).toHaveBeenCalledWith("API Error");
    expect(hideLoaderMock).toHaveBeenCalled();
  });

  it("should delete a registration successfully", async () => {
    (RegistrationService.deleteRegistration as jest.Mock).mockResolvedValue(
      registrationsMock[0]
    );

    setRegistrationsMock.mockImplementation((callback) => {
      const updatedRegistrations = callback(registrationsMock);

      expect(updatedRegistrations).toEqual([registrationsMock[1]]);
    });

    const { result } = renderHook(() => useRegistration(), { wrapper });

    await act(async () => {
      await result.current.deleteRegistration(registrationsMock[0]);
    });

    expect(showLoaderMock).toHaveBeenCalled();
    expect(RegistrationService.deleteRegistration).toHaveBeenCalledWith(
      registrationsMock[0]
    );
    expect(setRegistrationsMock).toHaveBeenCalled();
    expect(toastMock.success).toHaveBeenCalledWith(
      "Admissão deletada com sucesso!"
    );
    expect(hideLoaderMock).toHaveBeenCalled();
  });

  it("should handle error while deleting a registration", async () => {
    (RegistrationService.deleteRegistration as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );

    const { result } = renderHook(() => useRegistration(), { wrapper });

    await act(async () => {
      await result.current.deleteRegistration(registrationsMock[0]);
    });

    expect(showLoaderMock).toHaveBeenCalled();
    expect(RegistrationService.deleteRegistration).toHaveBeenCalled();
    expect(toastMock.error).toHaveBeenCalledWith("API Error");
    expect(hideLoaderMock).toHaveBeenCalled();
  });
});
