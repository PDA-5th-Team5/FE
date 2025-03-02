import styled from "styled-components";

export const MyPageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 80px 0;
`;

export const MyPageSidebar = styled.div`
  width: 200px;
  padding-right: 115px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const MyPageSidebarItem = styled.div<{ $active: boolean }>`
  display: flex;
  font-size: 24px;
  color: ${({ $active }) => ($active ? "#fff" : "#8b8d91")};
  font-weight: ${({ $active }) => ($active ? "700" : "400")};
  border-left: 4px solid
    ${({ $active }) => ($active ? "#2394df" : "transparent")};
  padding-left: 20px;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

export const MyPageContent = styled.div`
  width: 885px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const SectionTitle = styled.div`
  color: #fff;
  font-size: 28px;
  font-weight: 700;
`;

// 프로필 탭
export const SectionProfile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #1b212d;
  padding: 50px;
  box-sizing: border-box;
  gap: 44px;
`;

export const SectionProfileItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SectionProfileTitle = styled.div`
  font-size: 16px;
  color: #fff;
`;

export const SectionProfileInput = styled.input`
  width: 380px;
  height: 42px;
  border-radius: 8px;
  background: #272e3b;
  border: none;
  padding: 12px 20px;
  box-sizing: border-box;
  font-family: "Pretendard";
  color: #fff;
`;

export const ButtonWrapper = styled.div`
  margin-top: 240px;

  > button {
    min-width: 100px;
  }
`;
