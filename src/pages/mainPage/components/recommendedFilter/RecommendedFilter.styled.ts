import styled from "styled-components";

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
  cursor: pointer;

  &:hover {
    background: rgb(40, 50, 64);
  }
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

export const PortfolioSnowflakeWrapper = styled.div`
  width: 36px;
  height: 36px;
`;
