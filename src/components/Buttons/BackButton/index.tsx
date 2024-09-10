import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "../IconButton";
import { useHistory } from "react-router-dom";

export const BackButton = () => {
  const history = useHistory();

  const goToHome = () => {
    history.goBack();
  };

  return (
    <IconButton onClick={goToHome} aria-label="back">
      <HiOutlineArrowLeft size={24} data-testid="icon" />
    </IconButton>
  );
};
