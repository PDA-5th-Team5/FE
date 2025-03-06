import styled from "styled-components";
import Button from "../button/Button";

export interface HeaderButtonsProps {
  leftText?: string;
  onLeftClick?: () => void;
  rightText?: string;
  onRightClick?: () => void;
}

const HeaderButtonsWrapper = styled.div`
  display: flex;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  gap: 24px;
`;

const HeaderLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const HeaderButtons: React.FC<HeaderButtonsProps> = ({
  leftText,
  onLeftClick,
  rightText = "저장",
  onRightClick,
}) => {
  return (
    <HeaderButtonsWrapper>
      <HeaderLeft onClick={onLeftClick}>{leftText}</HeaderLeft>
      <Button text={rightText} onClick={onRightClick} />
    </HeaderButtonsWrapper>
  );
};

export default HeaderButtons;
