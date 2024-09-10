import styled from "styled-components";
import { darken } from "polished";

interface ButtonProps {
  size?: "small" | "large";
  bgcolor?: string;
  color?: string;
  disabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ size }) => (size === "small" ? "6px 16px" : "12px 32px")};
  background-color: ${({ bgcolor, theme, disabled }) =>
    disabled ? "#cccccc" : bgcolor ?? theme.colors.primary};
  color: ${({ color, disabled, theme }) =>
    disabled ? "#666666" : color ?? theme.colors.textLight};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  box-shadow: ${({ theme }) => theme.shadows.small};
  font-size: ${({ size }) => (size === "small" ? "14px" : "16px")};
  font-weight: 600;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: ${({ bgcolor, theme, disabled }) =>
      !disabled &&
      (bgcolor ? darken(0.1, bgcolor) : darken(0.1, theme.colors.primary))};
    box-shadow: ${({ theme, disabled }) => !disabled && theme.shadows.focus};
  }
`;
