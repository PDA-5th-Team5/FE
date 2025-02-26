import styled from "styled-components";

export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0px;
  gap: 24px;
`;

export const MainPageHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const MainPageTitle = styled.div`
  color: #fff;
  font-size: 28px;
  font-weight: 700;
`;

export const MainPageHeaderButtonWrapper = styled.div`
  display: flex;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  gap: 24px;
`;

export const MainPageHeaderReset = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainPageHeaderButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 64px;
  height: 40px;

  border-radius: 8px;
  background: #2595e0;
`;

// 추천 필터
export const MainPageBox = styled.div`
  border-radius: 8px;
  background: #1b212d;
  padding: 20px;
`;

export const MainPageTabWrapper = styled.div`
  display: flex;
`;

export const MainPageTab = styled.div<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? "#fff" : "#8B8D91")};
  font-size: 16px;
  font-weight: ${({ isActive }) => (isActive ? "700" : "400")};
  border-bottom: 2px solid
    ${({ isActive }) => (isActive ? "#fff" : "transparent")};
  padding: 11px 22px;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

export const MainPageRecommendedFilterList = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 20px;

  /* 가로스크롤 */
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const MainPageRecommendedFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 306px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #2c333d;
  background: #202833;
  gap: 16px;
  padding: 14px 20px;
  box-sizing: border-box;
`;

export const MainPageRecommendedFilterImg = styled.img`
  height: 36px;
`;

export const MainPageRecommendedFilterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
export const MainPageRecommendedFilterTitle = styled.div`
  color: #fff;
  font-size: 14px;
`;

export const MainPageRecommendedFilterCntWrapper = styled.div`
  display: flex;
  gap: 2px;
`;
export const MainPageRecommendedFilterCntImg = styled.img`
  width: 13px;
`;
export const MainPageRecommendedFilterCnt = styled.div`
  color: #dbdcdd;
  font-size: 12px;
`;
