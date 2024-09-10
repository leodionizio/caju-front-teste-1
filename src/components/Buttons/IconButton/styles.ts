import styled from 'styled-components';

interface IconButtonProps {
  color?: string;
}

export const IconButtonStyled = styled.button<IconButtonProps>`
  cursor: pointer;
  border: 2px solid ${({ color, theme }) => color || theme.colors.primary};
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  svg {
    color: ${({ color, theme }) => color || theme.colors.primary};
  }

  &:hover {
    background-color: ${({ color, theme }) =>
      color ? `${color}20` : `${theme.colors.primary}20`};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    border-color: ${({ theme }) => theme.colors.borderLight};
    svg {
      color: ${({ theme }) => theme.colors.borderLight};
    }
  }
`;
