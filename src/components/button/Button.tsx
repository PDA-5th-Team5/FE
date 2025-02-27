import styled from "styled-components";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 64px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: #2595e0;
  color: #fff;
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background: #1e7ec0;
  }
`;

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

export default Button;
