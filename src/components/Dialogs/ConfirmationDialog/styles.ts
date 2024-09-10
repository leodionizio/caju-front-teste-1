import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  width: 400px;
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.focus};
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.small};
  background: rgb(255, 117, 0);
  background: linear-gradient(
    258deg,
    rgba(255, 117, 0, 1) 8%,
    rgba(232, 5, 55, 1) 53%
  );
  width: 100%;
  height: 64px;
  padding: ${({ theme }) => theme.spacing.medium};
  box-sizing: border-box;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 18px;
`;

export const ModalTextContent = styled.div`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 16px;
  padding: ${({ theme }) => theme.spacing.medium};

  p {
    margin: 0;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.medium};
  gap: ${({ theme }) => theme.spacing.medium};
`;
