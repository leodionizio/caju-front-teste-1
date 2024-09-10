export type RegistrationStatus = "REVIEW" | "APPROVED" | "REPROVED";

export type Registration = {
  admissionDate: string;
  email: string;
  employeeName: string;
  status: RegistrationStatus;
  cpf: string;
  id: string;
};

export type GetRegistrationParam = Pick<Registration, "cpf">;

export type RegistrationFormData = {
  employeeName: string;
  email: string;
  cpf: string;
  admissionDate: string;
};
