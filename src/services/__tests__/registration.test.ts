import { RegistrationService } from "../registration";
import { api } from "../api";
import { getQueryParam } from "~/utils/getQueryParam";
import { Registration, RegistrationFormData } from "~/types/registration";

jest.mock("../api");
jest.mock("~/utils/getQueryParam");

describe("RegistrationService", () => {
  const registrationMock: Registration = {
    id: "1",
    employeeName: "John Doe",
    email: "john@example.com",
    cpf: "123.456.789-00",
    admissionDate: "2023-09-01",
    status: "REVIEW",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getRegistrations", () => {
    it("should fetch registrations successfully", async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: [registrationMock] });

      const result = await RegistrationService.getRegistrations();
      expect(api.get).toHaveBeenCalledWith("/registrations");
      expect(result).toEqual([registrationMock]);
    });

    it("should fetch registrations with query params", async () => {
      const queryParamMock = "?cpf=12345678900";
      (getQueryParam as jest.Mock).mockReturnValue(queryParamMock);
      (api.get as jest.Mock).mockResolvedValue({ data: [registrationMock] });

      const param = { cpf: "12345678900" };
      const result = await RegistrationService.getRegistrations(param);
      expect(api.get).toHaveBeenCalledWith(`/registrations${queryParamMock}`);
      expect(result).toEqual([registrationMock]);
    });

    it("should throw an error when the API request fails", async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error("API Error"));

      await expect(RegistrationService.getRegistrations()).rejects.toThrow(
        "Não foi possível carregar as admissões no momento. Tente novamente mais tarde."
      );
    });
  });

  describe("createRegistration", () => {
    const newRegistration: RegistrationFormData = {
      employeeName: "Jane Smith",
      email: "jane@example.com",
      cpf: "987.654.321-00",
      admissionDate: "2023-09-15",
    };

    it("should create a new registration successfully", async () => {
      (api.post as jest.Mock).mockResolvedValue({ data: registrationMock });

      const result = await RegistrationService.createRegistration(
        newRegistration
      );
      expect(api.post).toHaveBeenCalledWith("/registrations", {
        ...newRegistration,
        status: "REVIEW",
      });
      expect(result).toEqual(registrationMock);
    });

    it("should throw an error when creation fails", async () => {
      (api.post as jest.Mock).mockRejectedValue(new Error("API Error"));

      await expect(
        RegistrationService.createRegistration(newRegistration)
      ).rejects.toThrow(
        `Não foi possível criar a admissão de ${newRegistration.employeeName} no momento. Tente novamente mais tarde.`
      );
    });
  });

  describe("updateRegistration", () => {
    it("should update registration successfully", async () => {
      const updatedRegistration = { ...registrationMock, status: "APPROVED" };
      (api.put as jest.Mock).mockResolvedValue({ data: updatedRegistration });

      const result = await RegistrationService.updateRegistration(
        registrationMock,
        "APPROVED"
      );
      expect(api.put).toHaveBeenCalledWith(
        `/registrations/${registrationMock.id}`,
        {
          ...registrationMock,
          status: "APPROVED",
        }
      );
      expect(result).toEqual(updatedRegistration);
    });

    it("should throw an error when update fails", async () => {
      (api.put as jest.Mock).mockRejectedValue(new Error("API Error"));

      await expect(
        RegistrationService.updateRegistration(registrationMock, "APPROVED")
      ).rejects.toThrow(
        `Não foi possível atualizar a admissão de ${registrationMock.employeeName} no momento. Tente novamente mais tarde.`
      );
    });
  });

  describe("deleteRegistration", () => {
    it("should delete registration successfully", async () => {
      (api.delete as jest.Mock).mockResolvedValue({ data: registrationMock });

      const result = await RegistrationService.deleteRegistration(
        registrationMock
      );
      expect(api.delete).toHaveBeenCalledWith(
        `/registrations/${registrationMock.id}`
      );
      expect(result).toEqual(registrationMock);
    });

    it("should throw an error when deletion fails", async () => {
      (api.delete as jest.Mock).mockRejectedValue(new Error("API Error"));

      await expect(
        RegistrationService.deleteRegistration(registrationMock)
      ).rejects.toThrow(
        `Não foi possível deletar a admissão de ${registrationMock.employeeName} no momento. Tente novamente mais tarde.`
      );
    });
  });
});
