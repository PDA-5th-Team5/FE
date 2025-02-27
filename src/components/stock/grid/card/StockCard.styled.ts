import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 270px;
  height: 310px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #2c333d;
  background: #10141b;
  padding: 12px;
  gap: 6px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CardHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CardTitle = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

export const CardMarketCap = styled.div`
  color: #b8b9ba;
  font-size: 14px;
  font-weight: 400;
`;

export const CardHeaderRight = styled.div``;

export const CardDescription = styled.div`
  color: #fff;
  font-size: 14px;
  height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardImg = styled.img`
  width: 186px;
  /* height: 148px; */
  flex-shrink: 0;
`;

export const CardImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const CardFooter = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

export const CardFooterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
`;

export const CardFooterTitle = styled.div`
  color: #b8b9ba;
  font-size: 12px;
`;

export const CardFooterPrice = styled.div`
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  background-color: #262f3e;
  padding: 4px 6px;
  max-width: 74px;
  max-height: 20px;
`;

export const CardFooterChange = styled.div`
  color: red;
  font-size: 14px;
  border-radius: 4px;
  background-color: #262f3e;
  padding: 4px 6px;
  max-width: 74px;
  max-height: 20px;
`;
