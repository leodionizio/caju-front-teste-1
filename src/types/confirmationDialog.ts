export type ConfirmationDialogProps = {
  title: string;
  text: string;
  confirmAction: () => void;
  cancelAction?: () => void;
};
