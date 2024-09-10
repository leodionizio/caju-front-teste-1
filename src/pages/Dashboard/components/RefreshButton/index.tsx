import { useCallback } from "react";
import { HiRefresh } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useRegistration } from "~/hooks/useRegistration";
import { theme } from "~/styles/theme";

export const RefreshButton = () => {
  const { getRegistrations } = useRegistration();

  const refreshRegistrations = useCallback(
    () => getRegistrations(),
    [getRegistrations]
  );

  return (
    <IconButton
      aria-label="refetch"
      onClick={refreshRegistrations}
      color={theme.colors.primary}
    >
      <HiRefresh size={24} color={theme.colors.primary} data-testid="icon"/>
    </IconButton>
  );
};
