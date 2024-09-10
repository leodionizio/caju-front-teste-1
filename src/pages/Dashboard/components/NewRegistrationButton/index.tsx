import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "~/components/Buttons/Button";
import routes from "~/router/routes";

export const NewRegistrationButton = () => {
  const history = useHistory();

  const goToNewAdmissionPage = useCallback(
    () => history.push(routes.newRegistration),
    [history]
  );

  return <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>;
};
