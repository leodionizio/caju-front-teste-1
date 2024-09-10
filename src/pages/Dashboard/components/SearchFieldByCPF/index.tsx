import { useEffect, useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { isValid, strip } from "@fnando/cpf";
import TextField from "~/components/TextField";
import { useRegistration } from "~/hooks/useRegistration";
import * as S from "./styles";

export const SearchFieldByCPF = () => {
  const [cpf, setCPF] = useState("");
  const { getRegistrations } = useRegistration();
  const [isCPFValid, setIsCPFValid] = useState(false);

  const debouncedSearch = debounce(() => {
    setIsCPFValid(isValid(cpf));
  }, 500);

  useEffect(() => {
    if (isCPFValid) getRegistrations({ cpf: strip(cpf) });
  }, [isCPFValid]);

  useEffect(() => {
    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
  }, [cpf, debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCPF(e.target.value);
  };

  const getErrorMessage = useCallback(
    () => (cpf && !isCPFValid ? "O CPF digitado é inválido" : ""),
    [cpf, isCPFValid]
  );

  return (
    <S.SearchInputContent>
      <TextField
        placeholder="Buscar pelo CPF"
        error={getErrorMessage()}
        onChange={handleChange}
        mask="___.___.___-__"
        maskReplacement={/\d/}
      />
    </S.SearchInputContent>
  );
};
