import Bookmark from "../../../bookmark/Bookmark";
import * as S from "./StockCard.styled";
import Example from "../../../../assets/images/exampleCard.png";
import { getRandomColor } from "../../../../utils/colorUtils";
import { Stock } from "../../../../types/stockTypes";

export interface StockCardProps {
  stock: Stock;
  stocks: Stock[];
  setStocks: React.Dispatch<React.SetStateAction<Stock[]>>;
}

const StockCard = ({ stock, stocks, setStocks }: StockCardProps) => {
  const bgColor = getRandomColor(stock.stockId);
  return (
    <S.CardContainer to={`/stock/${stock.stockId}`} bgColor={bgColor}>
      <S.CardHeader>
        <S.CardHeaderLeft>
          <S.CardTitle>{stock.companyName}</S.CardTitle>
          <S.CardMarketCap>₩{stock.marketCap}</S.CardMarketCap>
        </S.CardHeaderLeft>

        <S.CardHeaderRight>
          <Bookmark
            stockId={stock.stockId}
            stocks={stocks}
            setStocks={setStocks}
          />
        </S.CardHeaderRight>
      </S.CardHeader>

      <S.CardContent>
        {/* 앞면: 줄임표 설명 + 이미지 */}
        <S.FrontContent className="front">
          <S.ShortDescription>{stock.description}</S.ShortDescription>
          <S.CardImgWrapper>
            <S.CardImg src={Example} />
          </S.CardImgWrapper>
        </S.FrontContent>

        {/* 뒷면: 더 많은 텍스트 (이미지 없이) */}
        <S.BackContent className="back">
          <S.LongDescription>{stock.description}</S.LongDescription>
        </S.BackContent>
      </S.CardContent>

      <S.CardFooter>
        <S.CardFooterItem>
          <S.CardFooterTitle>{stock.ticker}</S.CardFooterTitle>
          <S.CardFooterPrice>₩{stock.currentPrice}</S.CardFooterPrice>
        </S.CardFooterItem>
        <S.CardFooterItem>
          <S.CardFooterTitle>7D</S.CardFooterTitle>
          <S.CardFooterChange $isPositive={stock["1WeekFluctuationRate"] >= 0}>
            {stock["1WeekFluctuationRate"]}%
          </S.CardFooterChange>
        </S.CardFooterItem>
        <S.CardFooterItem>
          <S.CardFooterTitle>1Y</S.CardFooterTitle>
          <S.CardFooterChange $isPositive={stock["1YearFluctuationRate"] >= 0}>
            {stock["1YearFluctuationRate"]}%
          </S.CardFooterChange>
        </S.CardFooterItem>
      </S.CardFooter>
    </S.CardContainer>
  );
};

export default StockCard;
