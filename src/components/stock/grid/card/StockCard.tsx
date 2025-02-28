import Bookmark from "../../../bookmark/Bookmark";
import * as S from "./StockCard.styled";
import Example from "../../../../assets/images/exampleCard.png";
import { Stock } from "../../list/StockList";
import { getRandomColor } from "../../../../utils/colorUtils";

export interface StockCardProps {
  stock: Stock;
  onToggle: (id: number) => void;
}

const StockCard = ({ stock, onToggle }: StockCardProps) => {
  const bgColor = getRandomColor(stock.id);
  return (
    <S.CardContainer to={`stock/${stock.id}`} bgColor={bgColor}>
      <S.CardHeader>
        <S.CardHeaderLeft>
          <S.CardTitle>{stock.name}</S.CardTitle>
          <S.CardMarketCap>₩{stock.marketCap}</S.CardMarketCap>
        </S.CardHeaderLeft>

        <S.CardHeaderRight>
          <Bookmark
            isBookmarked={stock.bookmark}
            onToggle={() => onToggle(stock.id)}
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
          <S.CardFooterPrice>₩{stock.price}</S.CardFooterPrice>
        </S.CardFooterItem>
        <S.CardFooterItem>
          <S.CardFooterTitle>7D</S.CardFooterTitle>
          <S.CardFooterChange $isPositive={stock.change7d >= 0}>
            {stock.change7d}%
          </S.CardFooterChange>
        </S.CardFooterItem>
        <S.CardFooterItem>
          <S.CardFooterTitle>1Y</S.CardFooterTitle>
          <S.CardFooterChange $isPositive={stock.change1y >= 0}>
            {stock.change1y}%
          </S.CardFooterChange>
        </S.CardFooterItem>
      </S.CardFooter>
    </S.CardContainer>
  );
};

export default StockCard;
