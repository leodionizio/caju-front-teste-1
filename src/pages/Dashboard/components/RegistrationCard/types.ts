import { Registration } from "~/types/registration";

export type RegistrationCardProps = {
  registration: Registration;
};

export type ActionButtonProps = {
  show: boolean;
  color: string;
  text: string;
  action: () => void;
};
