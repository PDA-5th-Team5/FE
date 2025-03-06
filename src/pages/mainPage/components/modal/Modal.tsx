import * as S from "./Modal.styled";
import CloseIcon from "../../../../assets/images/icons/close.png";
import Button from "../../../../components/button/Button";

interface ModalProps {
  onClose: () => void;
  title?: string;
  confirmText?: string;
  onCofirm?: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  onCofirm,
  title,
  confirmText = "확인",
  children,
}) => {
  return (
    <S.ModalBackground>
      <S.ModalWrapper>
        <S.ModalHeader>
          <S.ModalTitle>{title}</S.ModalTitle>
          <S.ModalClose src={CloseIcon} onClick={onClose} />
        </S.ModalHeader>

        <S.ModalContent>{children}</S.ModalContent>

        <S.ModalConfirmWrapper>
          <Button text={confirmText} onClick={onCofirm} />
        </S.ModalConfirmWrapper>
      </S.ModalWrapper>
    </S.ModalBackground>
  );
};

export default Modal;
