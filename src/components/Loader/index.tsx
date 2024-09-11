import { ReactNode, useContext } from "react";
import LoadingOverlay from '@dvcode/react-loading-overlay';
import { LoaderContext } from "~/contexts/loaderContext";

type LoaderProps = {
  children: ReactNode;
};

export const Loader = ({ children }: LoaderProps) => {
  const { show } = useContext(LoaderContext);

  return (
    <LoadingOverlay active={show} spinner>
      {children}
    </LoadingOverlay>
  );
};
