import BookmarkIconOn from "../../assets/images/icons/bookmark_on.png";
import BookmarkIconOff from "../../assets/images/icons/bookmark_off.png";
import styled from "styled-components";
import { Stock } from "../../types/stockTypes";

interface BookmarkProps {
  stockId: number;
  stocks: Stock[];
  setStocks: React.Dispatch<React.SetStateAction<Stock[]>>;
}

const StyledBookmark = styled.div`
  width: 40px;
  height: 40px;
  background-color: #21272f;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const BookmarkIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Bookmark = ({ stockId, stocks, setStocks }: BookmarkProps) => {
  const onToggleBookmark = () => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.stockId === stockId
          ? { ...stock, isBookmark: !stock.isBookmark }
          : stock
      )
    );
    console.log(stockId, stocks);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleBookmark();
  };

  const isBookmarked = stocks.find((s) => s.stockId === stockId)?.isBookmark;

  return (
    <>
      <StyledBookmark onClick={handleClick}>
        <BookmarkIcon src={isBookmarked ? BookmarkIconOn : BookmarkIconOff} />
      </StyledBookmark>
    </>
  );
};

export default Bookmark;
