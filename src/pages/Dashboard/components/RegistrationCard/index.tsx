import { useCallback } from "react";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { RegistrationStatus } from "~/types/registration";
import { Button } from "~/components/Buttons/Button";
import { useRegistration } from "~/hooks/useRegistration";
import { theme } from "~/styles/theme";
import { useConfirmationDialog } from "~/hooks/useConfirmationDialog";
import { ActionButtonProps, RegistrationCardProps } from "./types";
import * as S from "./styles";

export const RegistrationCard = ({ registration }: RegistrationCardProps) => {
  const { updateRegistration, deleteRegistration } = useRegistration();
  const { showDialog } = useConfirmationDialog();

  const actionButtonsProps: ActionButtonProps[] = [
    {
      show: registration.status !== "REPROVED",
      color: theme.colors.error,
      text: "Reprovar",
      action: () =>
        handleAction(
          `Reprovar ${registration.employeeName}`,
          `Tem certeza que deseja reprovar ${registration.employeeName}?`,
          "REPROVED"
        ),
    },
    {
      show: registration.status !== "APPROVED",
      color: theme.colors.success,
      text: "Aprovar",
      action: () =>
        handleAction(
          `Aprovar ${registration.employeeName}`,
          `Tem certeza que deseja aprovar ${registration.employeeName}?`,
          "APPROVED"
        ),
    },
    {
      show: registration.status !== "REVIEW",
      color: theme.colors.warning,
      text: "Revisar novamente",
      action: () =>
        handleAction(
          `Revisar ${registration.employeeName} novamente`,
          `Tem certeza que deseja revisar a candidatura de ${registration.employeeName} novamente?`,
          "REVIEW"
        ),
    },
  ];

  const handleAction = useCallback(
    (title: string, text: string, status: RegistrationStatus) => {
      showDialog({
        title,
        text,
        confirmAction: () => updateRegistration(registration, status),
      });
    },
    [registration, showDialog, updateRegistration]
  );

  const handleDelete = useCallback(() => {
    showDialog({
      title: `Deletar ${registration.employeeName}`,
      text: `Tem certeza que deseja deleter ${registration.employeeName}?`,
      confirmAction: () => deleteRegistration(registration),
    });
  }, [deleteRegistration, registration, showDialog]);

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{registration.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{registration.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{registration.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        <div>
          {actionButtonsProps
            .filter((buttonProps) => buttonProps.show)
            .map(({ text, color, action }) => (
              <Button key={text} size="small" bgcolor={color} onClick={action}>
                {text}
              </Button>
            ))}
        </div>

        <HiOutlineTrash
          size={24}
          onClick={handleDelete}
          color={theme.colors.error}
          data-testid="delete-icon"
        />
      </S.Actions>
    </S.Card>
  );
};
