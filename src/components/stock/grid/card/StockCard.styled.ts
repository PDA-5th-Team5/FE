import { Link } from "react-router-dom";
import styled from "styled-components";

interface CardContainerProps {
  bgColor: string;
}

export const CardContainer = styled(Link)<CardContainerProps>`
  display: flex;
  text-decoration: none;
  flex-direction: column;
  justify-content: space-between;
  width: 270px;
  height: 310px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #2c333d;
  background-color: ${({ bgColor }) => bgColor};
  padding: 12px;
  gap: 8px;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
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
`;

export const CardHeaderRight = styled.div``;

// 가운데 내용
export const FrontContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 1;
  transition: opacity 0.3s;
`;

export const BackContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s;
`;

export const ShortDescription = styled.div`
  color: #fff;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  line-height: normal;
`;

export const LongDescription = styled.div`
  color: #fff;
  font-size: 14px;
  line-height: normal;

  /* 여러 줄 말줄임표 */
  display: -webkit-box;
  -webkit-line-clamp: 11;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardContent = styled.div`
  position: relative;
  flex: 1;

  ${CardContainer}:hover & ${FrontContent} {
    opacity: 0;
  }
  ${CardContainer}:hover & ${BackContent} {
    opacity: 1;
  }
`;

export const CardImg = styled.img`
  width: 171px;
  flex-shrink: 0;
`;

export const CardImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 16px;
`;

export const CardFooter = styled.div`
  display: flex;
  gap: 12px;
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

export const CardFooterChange = styled.div<{ $isPositive: boolean }>`
  color: ${({ $isPositive }) => ($isPositive ? "#E74142" : "#2D7AFF")};
  font-size: 14px;
  border-radius: 4px;
  background-color: #262f3e;
  padding: 4px 6px;
  max-width: 74px;
  max-height: 20px;
`;
