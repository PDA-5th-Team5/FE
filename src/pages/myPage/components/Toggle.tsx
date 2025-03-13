import styled from "styled-components";

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;

  > .toggle-container {
    width: 44px;
    height: 22px;
    border-radius: 30px;
    background-color: #bbbbbb;
  }
  > .toggle--checked {
    background-color: #2595e0;
    transition: 0.5s;
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: 0.5s;
  }
  > .toggle--checked {
    left: 24px;
    transition: 0.5s;
  }
`;

interface ToggleProps {
  checked: boolean;
  onToggle: () => void;
}

const Toggle = ({ checked, onToggle }: ToggleProps) => {
  return (
    <ToggleContainer onClick={onToggle}>
      <div className={`toggle-container ${checked ? "toggle--checked" : ""}`} />
      <div className={`toggle-circle ${checked ? "toggle--checked" : ""}`} />
    </ToggleContainer>
  );
};

export default Toggle;
