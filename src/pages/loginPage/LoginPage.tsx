import * as S from "../../components/layouts/header/Header.styled";
import Logo from "../../assets/images/logo.png";

import styled from "styled-components";

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginPageBox = styled.div`
  display: flex;
  flex-direction: column; /* 세로 레이아웃 */
  width: 380px;
  height: 720px;
  background-color: #1b212d;
  border: 1px solid #3c4049;
`;

// 로고/타이틀 영역
const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 59px;
  margin-bottom: 88px;
`;

// 폼 전체 감싸는 컨테이너
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 40px; /* 좌우 여백 */
  gap: 44px; /* 폼 요소 간 간격 */
  box-sizing: border-box;
`;

// 폼 각각의 필드(라벨 + 인풋) 감싸는 박스
const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px; /* 라벨과 인풋 사이 간격 */
`;

// 라벨 스타일
const FormLabel = styled.label`
  font-size: 14px;
  color: #fff;
`;

// 인풋 스타일
const FormInput = styled.input`
  height: 42px;
  border-radius: 8px;
  background: #3c4049;
  border: none;
  padding: 12px 16px;
  box-sizing: border-box;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  color: #fff;

  ::placeholder {
    color: #999;
  }
`;

// 하단 '로그인' 버튼(링크) 감싸는 래퍼
const LoginWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 186px;
`;

// '로그인' 텍스트 버튼(링크) 스타일
const LoginLink = styled.div`
  font-size: 14px;
  color: #878f9a; /* 스크린샷과 유사한 회색 톤 (원하는 색상으로 변경) */
  font-family: "Pretendard";
  cursor: pointer;

  /* '>' 기호를 자동으로 붙이기 위해 ::after 사용 */
  &::after {
    content: " >"; /* '로그인' 뒤에 공백 + 화살표 */
    margin-left: 2px; /* 화살표와 글자 사이 간격 */
    color: #878f9a; /* 화살표 색상 */
  }
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 300px;
  height: 42px;
  border: none;
  border-radius: 8px;
  background: #2595e0;
  color: #fff;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #1e7ec0;
  }
`;

const SignUpPage = () => {
  return (
    <LoginPageContainer>
      <LoginPageBox>
        {/* 상단 로고 */}
        <LogoWrapper>
          <S.HeaderImg src={Logo} alt="로고 이미지" />
        </LogoWrapper>

        {/* 폼 영역 */}
        <FormWrapper>
          <FormField>
            <FormLabel>아이디</FormLabel>
            <FormInput placeholder="소문자 + 숫자 조합으로 입력해주세요" />
          </FormField>

          <FormField>
            <FormLabel>비밀번호</FormLabel>
            <FormInput
              type="password"
              placeholder="8자 이상, 소문자 + 숫자 조합으로 입력해주세요"
            />
          </FormField>

          <ButtonWrapper>
            {/* 로그인 가기 버튼 */}
            <LoginWrapper>
              <LoginLink>회원가입</LoginLink>
            </LoginWrapper>

            {/* 확인 버튼 */}
            <StyledButton>확인</StyledButton>
          </ButtonWrapper>
        </FormWrapper>
      </LoginPageBox>
    </LoginPageContainer>
  );
};

export default SignUpPage;
