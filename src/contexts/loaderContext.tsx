import { createContext, Dispatch, SetStateAction, useState } from "react";

interface LoaderContextType {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const defaultContextValue: LoaderContextType = {
  show: false,
  setShow: () => {},
};

const LoaderContext = createContext(defaultContextValue);

const LoaderProvider = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <LoaderContext.Provider value={{ show, setShow }}>
      {children}
    </LoaderContext.Provider>
  );
};

export { LoaderProvider, LoaderContext };
