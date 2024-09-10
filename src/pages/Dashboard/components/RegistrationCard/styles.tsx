import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.backgroundLight};
  margin: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  box-shadow: ${({ theme }) => theme.shadows.small};
  color: ${({ theme }) => theme.colors.textDark};

  h3,
  p {
    margin: 0;
  }
`;

export const IconAndText = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const Actions = styled.div`
  margin-top: ${({ theme }) => theme.spacing.small};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};

  div {
    display: flex;
    gap: ${({ theme }) => theme.spacing.small};
  }

  svg {
    cursor: pointer;
  }
`;
