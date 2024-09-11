import { createContext, Dispatch, SetStateAction, useState } from "react";
import { ConfirmationDialogProps } from "~/types/confirmationDialog";
import { CustomContextProviderProps } from "~/types/contextProvider";

interface ConfirmationDialogContextType {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  dialogOptions?: ConfirmationDialogProps;
  setDialogOptions: Dispatch<
    SetStateAction<ConfirmationDialogProps | undefined>
  >;
}

const defaultContextValue: ConfirmationDialogContextType = {
  show: false,
  setShow: () => {},
  dialogOptions: undefined,
  setDialogOptions: () => {},
};

const ConfirmationDialogContext = createContext(defaultContextValue);

const ConfirmationDialogProvider = ({ children }: CustomContextProviderProps) => {
  const [show, setShow] = useState(false);
  const [dialogOptions, setDialogOptions] = useState<ConfirmationDialogProps>();

  return (
    <ConfirmationDialogContext.Provider
      value={{ show, setShow, dialogOptions, setDialogOptions }}
    >
      {children}
    </ConfirmationDialogContext.Provider>
  );
};

export { ConfirmationDialogProvider, ConfirmationDialogContext };
