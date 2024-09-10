import { api } from "./api";
import {
  GetRegistrationParam,
  Registration,
  RegistrationFormData,
  RegistrationStatus,
} from "~/types/registration";
import { getQueryParam } from "~/utils/getQueryParam";

const registrationsBaseUrl = "/registrations";

export const RegistrationService = {
  getRegistrations: async (
    param?: GetRegistrationParam
  ): Promise<Registration[]> => {
    let url: string = registrationsBaseUrl;
    try {
      if (param) url = url += getQueryParam(param);
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      throw new Error(
        "Não foi possível carregar as admissões no momento. Tente novamente mais tarde."
      );
    }
  },

  createRegistration: async (
    registration: RegistrationFormData
  ): Promise<Registration> => {
    const url: string = `${registrationsBaseUrl}`;
    try {
      const { data } = await api.post(url, {
        ...registration,
        status: "REVIEW",
      });
      return data;
    } catch (error) {
      throw new Error(
        `Não foi possível criar a admissão de ${registration.employeeName} no momento. Tente novamente mais tarde.`
      );
    }
  },

  updateRegistration: async (
    registration: Registration,
    status: RegistrationStatus
  ): Promise<Registration> => {
    const url: string = `${registrationsBaseUrl}/${registration.id}`;
    try {
      const { data } = await api.put(url, { ...registration, status });
      return data;
    } catch (error) {
      throw new Error(
        `Não foi possível atualizar a admissão de ${registration.employeeName} no momento. Tente novamente mais tarde.`
      );
    }
  },

  deleteRegistration: async (
    registration: Registration
  ): Promise<Registration> => {
    const url: string = `${registrationsBaseUrl}/${registration.id}`;
    try {
      const { data } = await api.delete(url);
      return data;
    } catch (error) {
      throw new Error(
        `Não foi possível deletar a admissão de ${registration.employeeName} no momento. Tente novamente mais tarde.`
      );
    }
  },
};
