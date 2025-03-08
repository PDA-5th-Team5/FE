import { useCallback, useEffect, useRef, useState } from "react";
import * as S from "../../components/layouts/header/Header.styled";
import Logo from "../../assets/images/logo.png";
import { signupAPI } from "../../apis/user";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignUpPageBox = styled.div`
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
  margin-bottom: 44px;
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
const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// '로그인' 텍스트 버튼(링크) 스타일
const FooterLoginLink = styled.div`
  font-size: 14px;
  color: #878f9a; /* 스크린샷과 유사한 회색 톤 (원하는 색상으로 변경) */
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

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  // 회원가입 확인 핸들러
  const signupSubmit = () => {
    signupAPI(username, password, email, nickname)
      .then((data) => {
        if (data.status === 200) {
          toast.success("회원가입 성공!");
        } else if (data.status === 409) {
          toast.error("아이디가 중복됩니다.");
        } else if (data.status === 500) {
          toast.error("서버 에러가 발생했습니다.");
        } else {
          toast.error("알 수 없는 오류가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.error("API 호출 실패", error);
        toast.error("회원가입 요청 중 오류가 발생했습니다.");
      });
  };

  return (
    <SignUpPageContainer>
      <SignUpPageBox>
        {/* 상단 로고 */}
        <LogoWrapper>
          <S.HeaderImg src={Logo} alt="로고 이미지" />
        </LogoWrapper>

        {/* 폼 영역 */}
        <FormWrapper>
          <FormField>
            <FormLabel>아이디</FormLabel>
            <FormInput
              placeholder="소문자 + 숫자 조합으로 입력해주세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormField>

          <FormField>
            <FormLabel>비밀번호</FormLabel>
            <FormInput
              type="password"
              placeholder="8자 이상, 소문자 + 숫자 조합으로 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormField>

          <FormField>
            <FormLabel>이메일</FormLabel>
            <FormInput
              placeholder="ex. abc@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormField>

          <FormField>
            <FormLabel>닉네임</FormLabel>
            <FormInput
              placeholder="10자 이내로 입력해주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </FormField>

          <ButtonWrapper>
            {/* 로그인 가기 버튼 */}
            <FooterWrapper>
              <FooterLoginLink>로그인</FooterLoginLink>
            </FooterWrapper>

            {/* 확인 버튼 */}
            <StyledButton onClick={signupSubmit}>확인</StyledButton>
          </ButtonWrapper>
        </FormWrapper>
      </SignUpPageBox>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </SignUpPageContainer>
  );
};

export default SignupPage;
