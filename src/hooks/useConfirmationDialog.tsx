import { useCallback, useContext } from "react";
import { ConfirmationDialogContext } from "~/contexts/confirmationDialogContext";
import { ConfirmationDialogProps } from "~/types/confirmationDialog";

export const useConfirmationDialog = () => {
  const { setShow, setDialogOptions } = useContext(ConfirmationDialogContext);

  const showDialog = useCallback(
    (options: ConfirmationDialogProps) => {
      setShow(true);
      setDialogOptions(options);
    },
    [setDialogOptions, setShow]
  );

  const closeDialog = useCallback(() => {
    setShow(false);
    setDialogOptions(undefined);
  }, [setDialogOptions, setShow]);

  return { showDialog, closeDialog };
};
