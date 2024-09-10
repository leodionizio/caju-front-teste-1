import { useCallback, useContext } from "react";
import { RegistrationsContext } from "~/contexts/registrationsContext";
import { RegistrationService } from "~/services/registration";
import {
  GetRegistrationParam,
  Registration,
  RegistrationFormData,
  RegistrationStatus,
} from "~/types/registration";
import { useToastify } from "./useToastify";
import { useLoader } from "./useLoader";

export const useRegistration = () => {
  const { registrations, setRegistrations } = useContext(RegistrationsContext);
  const { toast } = useToastify();
  const { showLoader, hideLoader } = useLoader();

  const updateRegistrations = useCallback(
    (newRegistration: Registration) => {
      setRegistrations((prevItems: Registration[]) =>
        prevItems.map((item) =>
          item.id === newRegistration.id
            ? { ...item, status: newRegistration.status }
            : item
        )
      );
    },
    [setRegistrations]
  );

  const removeRegistrationFromList = useCallback(
    (id: string) => {
      setRegistrations((prevItems: Registration[]) =>
        prevItems.filter((item) => item.id !== id)
      );
    },
    [setRegistrations]
  );

  const getRegistrations = useCallback(
    async (param?: GetRegistrationParam) => {
      showLoader();
      try {
        const registrations = await RegistrationService.getRegistrations(param);
        setRegistrations(registrations);
      } catch (error) {
        toast.error(error.message);
      } finally {
        hideLoader();
      }
    },
    [hideLoader, setRegistrations, showLoader, toast]
  );

  const createRegistration = useCallback(
    async (registration: RegistrationFormData) => {
      showLoader();
      try {
        await RegistrationService.createRegistration(registration);
        toast.success("Admissão criada com sucesso!");
      } catch (error) {
        toast.error(error.message);
      } finally {
        hideLoader();
      }
    },
    [hideLoader, showLoader, toast]
  );

  const updateRegistration = useCallback(
    async (registration: Registration, status: RegistrationStatus) => {
      showLoader();
      try {
        const updatedRegistration =
          await RegistrationService.updateRegistration(registration, status);
        updateRegistrations(updatedRegistration);
        toast.success("Admissão atualizada com sucesso!");
      } catch (error) {
        toast.error(error.message);
      } finally {
        hideLoader();
      }
    },
    [hideLoader, showLoader, toast, updateRegistrations]
  );

  const deleteRegistration = useCallback(
    async (registration: Registration) => {
      showLoader();
      try {
        const deletedRegistration =
          await RegistrationService.deleteRegistration(registration);
        removeRegistrationFromList(deletedRegistration.id);
        toast.success("Admissão deletada com sucesso!");
      } catch (error) {
        toast.error(error.message);
      } finally {
        hideLoader();
      }
    },
    [hideLoader, removeRegistrationFromList, showLoader, toast]
  );

  return {
    registrations,
    getRegistrations,
    createRegistration,
    updateRegistration,
    deleteRegistration,
  };
};
