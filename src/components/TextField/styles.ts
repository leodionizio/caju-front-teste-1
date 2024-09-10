import styled from "styled-components";

export const Input = styled.input.withConfig({
  shouldForwardProp: (prop) => !["hasError"].includes(prop),
})<{ hasError?: boolean }>`
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.borderRadius};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.inputBackground};
  border: 1px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.colors.inputBorder};
  font-size: 16px;
  line-height: 1.5;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.small};
  box-sizing: border-box;

  &:hover {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.colors.info};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.colors.info};
    box-shadow: 0 0 0 2px
      ${({ theme, hasError }) =>
        hasError ? theme.colors.error : theme.colors.info};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
    font-size: 14px;
  }
`;

export const InputContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

export const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  display: block;
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
  margin-top: 4px;
  margin-left: 4px;
  display: block;
`;
