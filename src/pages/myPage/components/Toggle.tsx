import { useState } from "react";
import styled from "styled-components";
import { postTelegramAlertAPI } from "../../../apis/portfolio";

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
  portfolioId: number;
}

const Toggle = ({ checked, portfolioId }: ToggleProps) => {
  const [isOn, setisOn] = useState(checked);

  const toggleHandler = (portfolioId: number) => {
    if (isOn) {
      alert("꺼진다 이제");
    } else {
      alert("켜진다 이제");
      postTelegramAlert(portfolioId);
    }

    setisOn(!isOn);
  };

  const postTelegramAlert = (portfolioId: number) => {
    postTelegramAlertAPI(portfolioId)
      .then((data) => {
        if (data.status === 200) {
        } else if (data.status === 400) {
          console.error("내 포트폴리오 알림 추가에 실패하였습니다.");
        } else {
          console.error("알 수 없는 오류가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.error("API 호출 실패", error);
      });
  };

  return (
    <>
      <ToggleContainer
        onClick={() => {
          toggleHandler(portfolioId);
        }}
      >
        <div
          className={`toggle-container ${isOn ? "toggle--checked" : null}`}
        />
        <div className={`toggle-circle ${isOn ? "toggle--checked" : null}`} />
      </ToggleContainer>
    </>
  );
};

export default Toggle;
