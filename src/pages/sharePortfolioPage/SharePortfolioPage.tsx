import { useState } from "react";
import SortDropdown from "../../components/sortDropdown/SortDropdown";
import * as S from "./SharePortfolioPage.styled";
import DropdownIcon from "../../assets/images/icons/arrowDonw_gray.png";
import PortfolioCard from "./portfolioCard/PortfolioCard";
import { SnowflakeP } from "../../types/snowflakeTypes";

export interface SharePortfolio {
  sharePortfolioId: number;
  sharePortfolioTitle: string;
  sharePortfolioDescription: string;
  sharePortfolioImportCnt: number;
  snowflakeP: SnowflakeP;
}

interface SharePortfolioData {
  sharePortfoliosCnt: number;
  sharePortfolios: SharePortfolio[];
}

const SharePortfolioPage = () => {
  const [sortKey, setSortKey] = useState("최신순");

  const data: SharePortfolioData = {
    sharePortfoliosCnt: 12,
    sharePortfolios: [
      {
        sharePortfolioId: 1,
        sharePortfolioTitle: "공유 포트폴리ad;lkfl;slf오명",
        sharePortfolioDescription: "공유 포트폴리오 설명",
        sharePortfolioImportCnt: 12,
        snowflakeP: {
          elements: {
            bsopPrti: [5, 19],
            thtrNtin: [1, 9],
            roeVal: [10, 16],
            cptlNtinRate: [1, 19],
            eps: [2, 3],
            per: [2, 3],
            ntinInrt: [2, 19],
            foreignerRatio: [1, 20],
          },
          market: "KOSPI",
          sectors: ["반도체", "바이오"],
        },
      },
      {
        sharePortfolioId: 2,
        sharePortfolioTitle: "공유 sldkjfl포트폴리오명",
        sharePortfolioDescription: "공유 포트폴리오 설명",
        sharePortfolioImportCnt: 12,
        snowflakeP: {
          elements: {
            bsopPrti: [5, 19],
            thtrNtin: [1, 3],
            roeVal: [10, 16],
          },
          market: "KOSPI",
          sectors: ["반도체", "바이오"],
        },
      },
      {
        sharePortfolioId: 3,
        sharePortfolioTitle: "공유 포트폴리오명",
        sharePortfolioDescription: "공유 포sdf트폴리오 설명",
        sharePortfolioImportCnt: 12,
        snowflakeP: {
          elements: {
            bsopPrti: [5, 19],
            thtrNtin: [1, 3],
            roeVal: [10, 16],
          },
          market: "KOSPI",
          sectors: ["반도체", "바이오"],
        },
      },
      {
        sharePortfolioId: 4,
        sharePortfolioTitle: "공유 포트폴asd리오명",
        sharePortfolioDescription: "공유 포트폴리오 설명",
        sharePortfolioImportCnt: 12,
        snowflakeP: {
          elements: {
            bsopPrti: [5, 19],
            thtrNtin: [1, 3],
            roeVal: [10, 16],
          },
          market: "KOSPI",
          sectors: ["반도체", "바이오"],
        },
      },
    ],
  };

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
        <S.SharePortfolioListCount>
          총 {data.sharePortfoliosCnt}개
        </S.SharePortfolioListCount>
        <SortDropdown
          options={["최신순", "인기순"]}
          selected={sortKey}
          onChange={setSortKey}
          icon={DropdownIcon}
        />
      </S.SharePortfolioListHeader>

      <S.SharePortfolioList>
        {data.sharePortfolios.map((portfolio) => (
          <PortfolioCard
            key={portfolio.sharePortfolioId}
            portfolio={portfolio}
          />
        ))}
      </S.SharePortfolioList>
    </S.SharePortfolioListContainer>
  );
};

export default SharePortfolioPage;
