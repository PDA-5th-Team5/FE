import { FC } from "react";
import * as S from "./StockResult.styled";
import ListOnIcon from "../../../assets/images/icons/view/list_on.png";
import ListOffIcon from "../../../assets/images/icons/view/list_off.png";
import GridOnIcon from "../../../assets/images/icons/view/grid_on.png";
import GridOffIcon from "../../../assets/images/icons/view/grid_off.png";

const StockResult: FC = () => {
  return (
    <S.StockResultHeader>
      <S.StockResultTitle>검색 결과 1,234개</S.StockResultTitle>
      <S.StockResultTool>
        <S.StockResultSortWrapper>
          <S.StockResultSort>시가총액</S.StockResultSort>
          <S.StockResultSort>오름차순</S.StockResultSort>
        </S.StockResultSortWrapper>
        <S.StockResultViewWrapper>
          <S.StockResultView src={ListOnIcon} />
          <S.StockResultView src={GridOffIcon} />
        </S.StockResultViewWrapper>
      </S.StockResultTool>
    </S.StockResultHeader>
  );
};

export default StockResult;
