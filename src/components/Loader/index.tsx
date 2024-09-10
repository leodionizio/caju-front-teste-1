import { useContext } from "react";
import LoadingOverlay from "react-loading-overlay";
import { LoaderContext } from "~/contexts/loaderContext";

export const Loader = ({ children }) => {
  const { show } = useContext(LoaderContext);

  return (
    <LoadingOverlay active={show} spinner>
      {children}
    </LoadingOverlay>
  );
};
