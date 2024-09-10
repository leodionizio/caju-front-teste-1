import { useCallback } from "react";
import { RegistrationStatus } from "~/types/registration";
import { Column } from "../Column";
import * as S from "./styles";
import { ColumnType, ColumnsProps } from "./types";

const allColumns: ColumnType[] = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

const Columns = ({ registrations }: ColumnsProps) => {
  const getRegistrationsByStatus = useCallback(
    (status: RegistrationStatus) =>
      registrations?.filter((registration) => registration.status === status),
    [registrations]
  );

  return (
    <S.Container>
      {allColumns.map((column) => {
        return (
          <Column
            key={column.title}
            title={column.title}
            status={column.status}
            registrations={getRegistrationsByStatus(column.status)}
          />
        );
      })}
    </S.Container>
  );
};
export default Columns;
