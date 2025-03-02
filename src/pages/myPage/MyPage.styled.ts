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
  width: 1000px;
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

// 관심 종목
export const SectionTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SectionCnt = styled.div`
  color: #fff;
  font-size: 20px;
`;

export const SectionGrid = styled.div`
  display: grid;
`;

// 나의 댓글
export const SectionComment = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentList = styled.div`
  width: 100%;
  border-radius: 8px;
  background: #1a222d;
  padding: 40px 48px;
  margin-top: 20px;
`;

export const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #404040;
  gap: 20px;
  padding: 20px 20px;

  &:hover {
    background: #253141;
    cursor: pointer;
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CommentTitle = styled.div`
  color: #8b8d91;
  font-size: 16px;
`;

export const CommentDate = styled.div`
  color: #8d9197;
  font-size: 14px;
`;

export const CommentContent = styled.div`
  color: #fff;
  font-size: 14px;
  line-height: 30px;
`;
