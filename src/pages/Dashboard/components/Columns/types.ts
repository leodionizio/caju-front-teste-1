import { Registration, RegistrationStatus } from "~/types/registration";

export type ColumnType = {
  status: RegistrationStatus;
  title: string;
};

export type ColumnsProps = {
  registrations?: Registration[];
};
