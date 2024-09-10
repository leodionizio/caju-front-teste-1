import styled from "styled-components";
import { theme } from "~/styles/theme";

const registrationStatusStyles: {
  [key in string]: { background: string; title: string };
} = {
  REVIEW: {
    background: "#FFFBE6",
    title: theme.colors.warning,
  },
  APPROVED: {
    background: "#E6F7E6",
    title: theme.colors.success,
  },
  REPROVED: {
    background: "#FFE6E6",
    title: theme.colors.error,
  },
};

export const Column = styled.div<{ status: string }>`
  height: auto;
  background-color: ${({ status }) =>
    registrationStatusStyles[status].background};
  border-radius: ${({ theme }) => theme.borderRadius};
  min-height: 69vh;
  max-height: 69vh;
  padding: ${({ theme }) => theme.spacing.medium};
  overflow: auto;
`;

export const TitleColumn = styled.h3<{ status: string }>`
  color: ${({ status }) => registrationStatusStyles[status].title};
  margin: ${({ theme }) => theme.spacing.medium};
`;

export const CollumContent = styled.div`
  max-height: 85%;
`;
