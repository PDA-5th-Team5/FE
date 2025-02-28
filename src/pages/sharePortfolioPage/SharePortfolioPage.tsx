import { useState } from "react";
import SortDropdown from "../../components/sortDropdown/SortDropdown";
import * as S from "./SharePortfolioPage.styled";
import DropdownIcon from "../../assets/images/icons/arrowDonw_gray.png";

const SharePortfolioPage = () => {
  const [sortKey, setSortKey] = useState("최신순");

  return (
    <S.SharePortfolioListContainer>
      <S.SharePortfolioListTitle>
        공유 포트폴리오 모아보기
      </S.SharePortfolioListTitle>
      <S.SharePortfolioListSubTitle>
        다른 사람들의 포트폴리오를 보고, 그들의 전략을 참고하여 더 나은 투자
        결정을 내려보세요
      </S.SharePortfolioListSubTitle>

      <S.SharePortfolioListHeader>
        <S.SharePortfolioListCount>총 1,234개</S.SharePortfolioListCount>
        <SortDropdown
          options={["최신순", "인기순"]}
          selected={sortKey}
          onChange={setSortKey}
          icon={DropdownIcon}
        />
      </S.SharePortfolioListHeader>

      <S.SharePortfolioList></S.SharePortfolioList>
    </S.SharePortfolioListContainer>
  );
};

export default SharePortfolioPage;
