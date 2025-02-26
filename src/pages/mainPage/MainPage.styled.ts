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
  display: flex;
  border-radius: 8px;
  background: #1b212d;
  padding: 20px;
`;

export const MainPageTabContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainPageTabWrapper = styled.div`
  display: flex;
`;

export const MainPageTab = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#8B8D91")};
  font-size: 16px;
  font-weight: ${({ $isActive }) => ($isActive ? "700" : "400")};
  border-bottom: 2px solid
    ${({ $isActive }) => ($isActive ? "#fff" : "transparent")};
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
  width: 1160px;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

// 필터 설정
export const MainPageFilterContainer = styled.div`
  width: 100%;
  height: 634px;
  display: flex;
  gap: 28px;
  justify-content: space-between;
`;

// 1. snowflake
export const MainPageSnowflakeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* width: 520px;
  height: 100%; */
  margin-top: 20px;
  /* background-color: pink; */
`;

export const MainPageSnowflake = styled.div`
  width: 520px;
  margin-top: 30px;
  /* width: 512px;
  height: 460px;
  margin-top: 20px;
  background-color: palegoldenrod; */
`;

export const MainPageFilterSectionWraaper = styled.div`
  display: flex;
  flex-direction: column;
  width: 608px;
  gap: 16px;
`;

export const MainPageFilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 8px;
  background: #202833;
  padding: 20px;
`;

export const MainPageFilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MainPageFilterTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MainPageFilterTitle = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;

export const MainPageFilterSubTitle = styled.div`
  color: #8b8c90;
  font-size: 12px;
`;

export const MainPageFilterReset = styled.img`
  width: 24px;
  cursor: pointer;
`;

export const MainPageFilterWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  flex-wrap: wrap;
`;

// 섹터설정
export const MainPageFilterFixSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 8px;
  background: #202833;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
`;

export const MainPageFilterSector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MainPageFilterAddIcon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;
`;

export const MainPageFilterNoSector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 40px;
  color: #8b8c90;
  font-size: 12px;
`;

// 변환 결과
export const MainPageConversionWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

export const MainPageConversion = styled.div`
  width: fit-content;
  padding: 10px 12px;
  border-radius: 8px;
  background: #373d47;
  color: #d7d8da;
  font-size: 14px;
`;
