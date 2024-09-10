import { useCallback, useContext } from "react";
import { LoaderContext } from "~/contexts/loaderContext";

export const useLoader = () => {
  const { setShow } = useContext(LoaderContext);

  const showLoader = useCallback(() => setShow(true), [setShow]);
  const hideLoader = useCallback(() => setShow(false), [setShow]);

  return { showLoader, hideLoader };
};
