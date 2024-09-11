import { createContext, Dispatch, SetStateAction, useState } from "react";
import { CustomContextProviderProps } from "~/types/contextProvider";
import { Registration } from "~/types/registration";

interface RegistrationsContextType {
  registrations: Registration[];
  setRegistrations: Dispatch<SetStateAction<Registration[]>>;
}

const defaultContextValue: RegistrationsContextType = {
  registrations: [],
  setRegistrations: () => {},
};

const RegistrationsContext = createContext(defaultContextValue);

const RegistrationsProvider = ({ children }: CustomContextProviderProps) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  return (
    <RegistrationsContext.Provider value={{ registrations, setRegistrations }}>
      {children}
    </RegistrationsContext.Provider>
  );
};

export { RegistrationsProvider, RegistrationsContext };
