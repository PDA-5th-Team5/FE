import { useState } from "react";
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
  onChange?: (value: boolean) => void;
}

const Toggle = ({ checked, onChange }: ToggleProps) => {
  const [isOn, setisOn] = useState(checked);

  const toggleHandler = () => {
    setisOn(!isOn);
  };
  return (
    <>
      <ToggleContainer onClick={toggleHandler}>
        <div
          className={`toggle-container ${isOn ? "toggle--checked" : null}`}
        />
        <div className={`toggle-circle ${isOn ? "toggle--checked" : null}`} />
      </ToggleContainer>
    </>
  );
};

export default Toggle;
