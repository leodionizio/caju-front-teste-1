import Collumns from "./components/Columns";
import { useRegistration } from "~/hooks/useRegistration";
import { useEffect } from "react";
import { NewRegistrationButton } from "./components/NewRegistrationButton";
import { RefreshButton } from "./components/RefreshButton";
import { SearchFieldByCPF } from "./components/SearchFieldByCPF";
import * as S from "./styles";

const DashboardPage = () => {
  const { registrations, getRegistrations } = useRegistration();

  useEffect(() => {
    getRegistrations();
  }, []);

  return (
    <S.Container>
      <S.ActionsContainer>
        <SearchFieldByCPF />

        <S.Actions>
          <RefreshButton />
          <NewRegistrationButton />
        </S.Actions>
      </S.ActionsContainer>

      <Collumns registrations={registrations} />
    </S.Container>
  );
};
export default DashboardPage;
