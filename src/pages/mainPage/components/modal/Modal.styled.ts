import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 720px;
  height: 517px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #1a222d;
  padding: 30px 36px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalTitle = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
`;

export const ModalClose = styled.img`
  width: 24px;
  cursor: pointer;
`;

export const ModalContent = styled.div`
  width: 720px;
  background-color: pink;
  height: 332px;
`;

export const ModalConfirmWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ModalConfirm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #2595e0;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;
