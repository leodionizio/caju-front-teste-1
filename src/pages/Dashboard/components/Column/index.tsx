import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { Registration, RegistrationStatus } from "~/types/registration";

type ColumnProps = {
  title: string;
  status: RegistrationStatus;
  registrations?: Registration[];
};

export const Column = ({ title, status, registrations }: ColumnProps) => {
  return (
    <S.Column status={status} key={title}>
      <S.TitleColumn status={status}>{title}</S.TitleColumn>
      <S.CollumContent>
        {registrations?.map((registration) => {
          return (
            <RegistrationCard
              registration={registration}
              key={registration.id}
              data-testid="registration-card"
            />
          );
        })}
      </S.CollumContent>
    </S.Column>
  );
};
