import { useForm, Controller } from "react-hook-form";
import { isValid, strip } from "@fnando/cpf";
import { Button } from "~/components/Buttons/Button";
import TextField from "~/components/TextField";
import { RegistrationFormData } from "~/types/registration";
import * as S from "./styles";

export type RegistrationFormProps = {
  onSubmit: (param: any) => void;
};

export const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isValid: isFormValid },
  } = useForm<RegistrationFormData>({
    defaultValues: {
      employeeName: "",
      email: "",
      cpf: "",
      admissionDate: "",
    },
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="employeeName"
        control={control}
        rules={{
          required: "O nome é obrigatório",
          pattern: {
            value: /^[A-Za-zÀ-ÿ]{2,}( [A-Za-zÀ-ÿ]{2,})+$/,
            message: "O nome inserido é invalido",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            id="employeeName"
            placeholder="Insira o nome completo"
            label="Nome Completo"
            error={error ? error.message : ""}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: "O e-mail é obrigatório",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "O e-mail inserido é inválido",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            id="email"
            placeholder="Insira o e-mail"
            label="E-mail"
            type="email"
            error={error ? error.message : ""}
          />
        )}
      />

      <Controller
        name="cpf"
        control={control}
        rules={{
          required: "O CPF é obrigatório",
          validate: (value) =>
            isValid(strip(value)) || "O CPF inserido é inválido",
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <TextField
              {...field}
              id="cpf"
              placeholder="Insira o cpf"
              label="CPF"
              mask="___.___.___-__"
              maskReplacement={/\d/}
              error={error ? error.message : ""}
            />
          );
        }}
      />

      <Controller
        name="admissionDate"
        control={control}
        rules={{
          required: "A data de admissão é obrigatória",
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            id="admissionDate"
            label="Data de admissão"
            type="date"
            error={error ? error.message : ""}
          />
        )}
      />

      <S.FormActions>
        <Button type="submit" disabled={!isFormValid}>
          Cadastrar
        </Button>
      </S.FormActions>
    </form>
  );
};
