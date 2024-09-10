import styled from "styled-components";
import { IconButton } from "~/components/Buttons/IconButton";
import { Button } from "~/components/Buttons/Button";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

export const Card = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.borderLight};
  width: 500px;
  padding: ${({ theme }) => theme.spacing.large};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};

  ${IconButton} {
    margin-bottom: ${({ theme }) => theme.spacing.small};
    align-items: flex-start;
  }

  ${Button} {
    align-self: flex-end;
  }
`;
