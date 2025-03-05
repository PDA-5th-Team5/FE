import styled from "styled-components";

export const StockPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 80px 0;
  gap: 60px;
`;

export const StockInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 287px;
  border-radius: 8px;
  background: #1b212d;
  padding: 32px 44px;
  box-sizing: border-box;
  justify-content: space-between;
`;

export const StockInfoTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StockInfoLeft = styled.div`
  display: flex;
  gap: 28px;
`;

export const StockInfoImg = styled.img`
  width: 120px;
  height: 120px;
`;

export const StockInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StockInfoSector = styled.div`
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  background: #262f3e;
  padding: 4px 16px;
  width: fit-content;
`;

export const StockInfoName = styled.div`
  color: #fff;
  font-size: 36px;
  font-weight: 700;
`;

export const StockInfoWrapper = styled.div`
  display: flex;
  gap: 16px;
`;
export const StockInfoMarket = styled.div`
  color: #fff;
  font-size: 16px;
`;

export const StockInfoTicker = styled.div`
  color: #fff;
  font-size: 16px;
`;

export const StockInfoRight = styled.div`
  background-color: pink;
`;

export const StockInfoBottom = styled.div`
  display: flex;
  gap: 78px;
`;

export const StockInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StockInfoTitle = styled.div`
  color: #c8c9cb;
  font-size: 12px;
`;
export const StockInfoContent = styled.div`
  color: #fff;
  font-size: 20px;
`;

export const StockInfoNum = styled.div<{ $isPositive: boolean }>`
  color: ${({ $isPositive }) => ($isPositive ? "#E74142" : "#2D7AFF")};
  font-size: 20px;
`;

// 주식 개요
export const StockOutlineContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StockOutline = styled.div`
  display: flex;
  width: 888px;
  height: 242px;
  border-radius: 8px;
  background: #1b212d;
  padding: 32px 44px;
  box-sizing: border-box;
  justify-content: space-between;
`;

export const StockOutlineLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Title = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
`;

export const Content = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  width: 500px;
`;

export const StockOutlineRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StockOutlineItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
`;

export const StockOutlineTitle = styled.div`
  color: #c8c9cb;
  font-size: 16px;
`;

export const StockOutlineContent = styled.div`
  color: #fff;
  font-size: 16px;
`;

export const StockSnowflake = styled.div`
  background-color: pink;
  width: 242px;
  height: 242px;
`;

// 캔들차트
export const StockCandleChart = styled.div`
  height: 613px;
  border-radius: 8px;
  background: #1b212d;
  padding: 32px 44px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;
`;

export const SubTitle = styled.div`
  color: #8b8c90;
  font-size: 14px;
`;

// 경쟁사
export const StockCompetitor = styled.div`
  height: 428px;
  border-radius: 8px;
  background: #1b212d;
  padding: 32px 44px;
  box-sizing: border-box;
`;

// 라인그래프
export const StockLineGraph = styled.div`
  height: 642px;
  border-radius: 8px;
  background: #1b212d;
  padding: 32px 44px;
  box-sizing: border-box;
`;

// 댓글
export const StockComments = styled.div``;
