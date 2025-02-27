import * as S from "./StockList.styled";
import Example from "../../../assets/images/example.png";
import Bookmark from "../../bookmark/Bookmark";

export interface Stock {
  id: number;
  ticker: string;
  name: string;
  price: number;
  change7d: number;
  change1y: number;
  marketCap: number;
  per: number;
  debtRatio: number;
  sector: string;
  bookmark: boolean;
}

interface StockTableProps {
  stocks: Stock[];
  onToggle: (id: number) => void;
}

const StockList = ({ stocks, onToggle }: StockTableProps) => {
  return (
    <S.StyledTable>
      <thead>
        <tr>
          <th></th>
          <th>회사</th>
          <th>현재가</th>
          <th>7일 변동률</th>
          <th>1년 변동률</th>
          <th>시가총액</th>
          <th>PER</th>
          <th>부채비율</th>
          <th>섹터</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.id}>
            <td>
              <S.StockListImg src={Example} />
            </td>
            <td>
              <S.StockListTicker>{stock.ticker}</S.StockListTicker>
              <S.StockListName>{stock.name}</S.StockListName>
            </td>
            <td>₩{stock.price}</td>

            <S.ChangeTd isPositive={stock.change7d >= 0}>
              {stock.change7d}
            </S.ChangeTd>

            <S.ChangeTd isPositive={stock.change1y >= 0}>
              {stock.change1y}%
            </S.ChangeTd>
            <td>{stock.marketCap}</td>
            <td>{stock.per}</td>
            <td>{stock.debtRatio}%</td>
            <td>{stock.sector}</td>
            <td>
              <Bookmark
                isBookmarked={stock.bookmark}
                onToggle={() => onToggle(stock.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </S.StyledTable>
  );
};

export default StockList;
