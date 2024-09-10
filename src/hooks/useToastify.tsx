import { toast as toastify } from "react-toastify";

export const useToastify = () => {
  const toast = {
    success: toastify.success,
    error: toastify.error,
    info: toastify.info,
    warning: toastify.warning,
  };

  return { toast };
};
