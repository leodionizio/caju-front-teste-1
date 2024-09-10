import { useHistory } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import routes from "~/router/routes";
import { useRegistration } from "~/hooks/useRegistration";
import { RegistrationFormData } from "~/types/registration";
import { RegistrationForm } from "./components/RegistrationForm";
import { BackButton } from "~/components/Buttons/BackButton";
import * as S from "./styles";

const NewRegistrationPage = () => {
  const { createRegistration } = useRegistration();
  const history = useHistory();

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    await createRegistration(data);
    history.push(routes.dashboard);
  };

  return (
    <S.Container>
      <S.Card>
        <BackButton />
        <RegistrationForm onSubmit={onSubmit} />
      </S.Card>
    </S.Container>
  );
};

export default NewRegistrationPage;
