import { useCallback, useContext } from "react";
import { ConfirmationDialogContext } from "~/contexts/confirmationDialogContext";
import { Button } from "~/components/Buttons/Button";
import { HiX } from "react-icons/hi";
import { theme } from "~/styles/theme";
import { useConfirmationDialog } from "~/hooks/useConfirmationDialog";
import * as S from "./styles";

export const ConfirmationModal = () => {
  const { show, dialogOptions } = useContext(ConfirmationDialogContext);
  const { closeDialog } = useConfirmationDialog();

  const handleConfirm = useCallback(() => {
    dialogOptions?.confirmAction();
    closeDialog();
  }, [closeDialog, dialogOptions]);

  const handleCancel = useCallback(() => {
    if (dialogOptions?.cancelAction) {
      dialogOptions.cancelAction();
      return;
    }

    closeDialog();
  }, [closeDialog, dialogOptions]);

  if (!show) return;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>
          <S.ModalTitle>{dialogOptions?.title}</S.ModalTitle>
          <HiX
            size={24}
            color={theme.colors.textLight}
            onClick={handleCancel}
            data-testid="closeButton"
          />
        </S.ModalHeader>
        <S.ModalTextContent>
          <p>{dialogOptions?.text}</p>
        </S.ModalTextContent>
        <S.ModalActions>
          <Button
            bgcolor={theme.colors.backgroundLight}
            color={theme.colors.textDark}
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </S.ModalActions>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};
