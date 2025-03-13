import styled from "styled-components";
import TelegramGuide1 from "../../../assets/images/telegram/guide1.png";
import TelegramGuide2 from "../../../assets/images/telegram/guide2.png";
import TelegramGuide3 from "../../../assets/images/telegram/guide3.png";
import TelegramLogo from "../../../assets/images/telegram/telegram.png";

const TelegramGuideContainer = styled.div`
  margin-top: 58px;
`;

const TelegramGuideText = styled.div`
  color: #fff;
  font-size: 16px;

  span {
    color: #2595e0;
    font-size: 16px;
    font-weight: 700;
  }
  margin: 36px 0px 16px 0px;
`;

const TelegramLogoImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 8px;
`;

const TelegramGuideImg = styled.img`
  width: 234px;
  height: 283px;
`;

const TelegramGuideImgWrapper = styled.div`
  display: flex;
  gap: 28px;
`;

const TelegramGuide = () => {
  return (
    <>
      <TelegramGuideContainer>
        <TelegramGuideText>텔레그램 Chat ID를 발급하는 방법</TelegramGuideText>

        <TelegramGuideText>
          1. App store 또는 구글 플레이 스토어에서
          <span> Telegram Messenger</span>를 설치합니다.
        </TelegramGuideText>
        <TelegramLogoImg src={TelegramLogo} />

        <TelegramGuideText>
          2. 앱에 접속하여 검색 창에
          <span> snowperbot</span>을 입력 후, 클릭합니다.
        </TelegramGuideText>
        <TelegramGuideImgWrapper>
          <TelegramGuideImg src={TelegramGuide1} />
          <TelegramGuideImg src={TelegramGuide2} />
        </TelegramGuideImgWrapper>

        <TelegramGuideText>
          3. 해당 채팅 창에서 <span>/start</span> 를 입력하여
          <span> 텔레그램 Chat ID</span>를 발급합니다.
        </TelegramGuideText>
        <TelegramGuideImg src={TelegramGuide3} />
      </TelegramGuideContainer>
    </>
  );
};

export default TelegramGuide;
