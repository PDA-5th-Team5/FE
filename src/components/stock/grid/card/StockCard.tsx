import Bookmark from "../../../bookmark/Bookmark";
import * as S from "./StockCard.styled";
import { getRandomColor } from "../../../../utils/colorUtils";
import { Stock } from "../../../../types/stockTypes";
import { Item } from "../../../../types/snowflakeTypes";
import StockSnowflake from "../../../snowflake/StockSnowflake";

export interface StockCardProps {
  stock: Stock;
  stocks: Stock[];
  setStocks: React.Dispatch<React.SetStateAction<Stock[]>>;
  allItems: Item[];
  selectedKeys: string[];
  onToggleBookmark: (stockId: number, newState: boolean) => void;
}

const StockCard = ({
  stock,

  allItems,
  selectedKeys,
  onToggleBookmark,
}: StockCardProps) => {
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
            isBookmarked={stock.isBookmark}
            onToggleBookmark={onToggleBookmark}
          />
        </S.CardHeaderRight>
      </S.CardHeader>

      <S.CardContent>
        {/* 앞면: 줄임표 설명 + 이미지 */}
        <S.FrontContent className="front">
          <S.ShortDescription>{stock.description}</S.ShortDescription>
          <S.CardImgWrapper>
            <StockSnowflake
              allItems={allItems}
              selectedKeys={selectedKeys}
              showLabels={true}
            />
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
