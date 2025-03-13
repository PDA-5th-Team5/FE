import { useEffect, useState } from "react";
import SortDropdown from "../../components/sortDropdown/SortDropdown";
import * as S from "./SharePortfolioPage.styled";
import DropdownIcon from "../../assets/images/icons/arrowDonw_gray.png";
import PortfolioCard from "./portfolioCard/PortfolioCard";
import { SnowflakeP } from "../../types/snowflakeTypes";
import { sharePortfolioListAPI } from "../../apis/portfolio";
import { transformElementsToItems } from "../../utils/snowflakeUtils";

// src/types/portfolioTypes.ts

// API에서 반환하는 포트폴리오 객체 구조
export interface APIPortfolio {
  id: string;
  title: string;
  description: string;
  category: string;
  portfolioId: number;
  market: string;
  sector: string[];
  marketCap?: {
    min: number;
    max: number;
  };
  per?: {
    min: number;
    max: number;
  };
  dividendYield?: {
    min: number;
    max: number;
  };
  foreignerRatio?: {
    min: number;
    max: number;
  };
  lbltRate?: {
    min: number;
    max: number;
  };
  ntinInrt?: {
    min: number;
    max: number;
  };
  grs?: {
    min: number;
    max: number;
  };
  roeVal?: {
    min: number;
    max: number;
  };
}

// 단일 공유 포트폴리오 항목의 응답 타입
export interface SharePortfolioResponseItem {
  sharePortfolioId: number;
  loadCount: number;
  createdAt: string;
  portfolio: APIPortfolio;
}

// 전체 응답 구조
export interface SharePortfolioListResponse {
  status: number;
  message: string;
  data: SharePortfolioResponseItem[];
}



export interface SharePortfolio {
  sharePortfolioId: number;
  sharePortfolioTitle: string;
  sharePortfolioDescription: string;
  sharePortfolioImportCnt: number;
  snowflakeP: SnowflakeP;
}

// interface SharePortfolioData {
//   sharePortfoliosCnt: number;
//   sharePortfolios: SharePortfolio[];
// }

const SharePortfolioPage = () => {
  const [sortKey, setSortKey] = useState("최신순");
  const [sharePortfolio, setSharePortfolio] = useState<SharePortfolio[]>([]);
  // const data: SharePortfolioData = {
  //   sharePortfoliosCnt: 12,
  //   sharePortfolios: [
  //     {
  //       sharePortfolioId: 1,
  //       sharePortfolioTitle: "공유 포트폴리ad;lkfl;slf오명",
  //       sharePortfolioDescription: "공유 포트폴리오 설명",
  //       sharePortfolioImportCnt: 12,
  //       snowflakeP: {
  //         elements: {
  //           bsopPrti: [5, 19],
  //           thtrNtin: [1, 9],
  //           roeVal: [10, 16],
  //           pbr: [1, 19],
  //           eps: [2, 3],
  //           per: [2, 3],
  //           ntinInrt: [2, 19],
  //           foreignerRatio: [1, 20],
  //         },
  //         market: "KOSPI",
  //         sectors: ["반도체", "바이오"],
  //       },
  //     },
  //     {
  //       sharePortfolioId: 2,
  //       sharePortfolioTitle: "공유 sldkjfl포트폴리오명",
  //       sharePortfolioDescription: "공유 포트폴리오 설명",
  //       sharePortfolioImportCnt: 12,
  //       snowflakeP: {
  //         elements: {
  //           bsopPrti: [5, 19],
  //           thtrNtin: [1, 3],
  //           roeVal: [10, 16],
  //         },
  //         market: "KOSPI",
  //         sectors: ["반도체", "바이오"],
  //       },
  //     },
  //     {
  //       sharePortfolioId: 3,
  //       sharePortfolioTitle: "공유 포트폴리오명",
  //       sharePortfolioDescription: "공유 포sdf트폴리오 설명",
  //       sharePortfolioImportCnt: 12,
  //       snowflakeP: {
  //         elements: {
  //           bsopPrti: [5, 19],
  //           thtrNtin: [1, 3],
  //           roeVal: [10, 16],
  //         },
  //         market: "KOSPI",
  //         sectors: ["반도체", "바이오"],
  //       },
  //     },
  //     {
  //       sharePortfolioId: 4,
  //       sharePortfolioTitle: "공유 포트폴asd리오명",
  //       sharePortfolioDescription: "공유 포트폴리오 설명",
  //       sharePortfolioImportCnt: 12,
  //       snowflakeP: {
  //         elements: {
  //           bsopPrti: [5, 19],
  //           thtrNtin: [1, 3],
  //           roeVal: [10, 16],
  //         },
  //         market: "KOSPI",
  //         sectors: ["반도체", "바이오"],
  //       },
  //     },
  //   ],
  // };

  useEffect(() => {
    const fetchSharePortfolio = async () => {
      try {
        const sortKeyMap: { [key: string]: string } = {
          최신순: "createdAt",
          인기순: "loadCount",
        };

        const apiSortKey = sortKeyMap[sortKey] || "loadCount";
        const response = await sharePortfolioListAPI(apiSortKey);

        // API 응답 데이터를 컴포넌트 형식으로 변환
        const convertedData = response.map((item) => {
          // 각 항목의 elements 객체 구성
          const elementsObj: { [key: string]: number[] } = {};
          const portfolio = item.portfolio;

          // 모든 가능한 재무 지표 확인 및 추가
          if (portfolio.marketCap) {
            elementsObj.marketCap = [
              Number(portfolio.marketCap.min),
              Number(portfolio.marketCap.max),
            ];
          }
          if (portfolio.per) {
            elementsObj.per = [
              Number(portfolio.per.min),
              Number(portfolio.per.max),
            ];
          }
          if (portfolio.eps) {
            elementsObj.eps = [
              Number(portfolio.eps.min),
              Number(portfolio.eps.max),
            ];
          }
          if (portfolio.bps) {
            elementsObj.bps = [
              Number(portfolio.bps.min),
              Number(portfolio.bps.max),
            ];
          }
          if (portfolio.pbr) {
            elementsObj.pbr = [
              Number(portfolio.pbr.min),
              Number(portfolio.pbr.max),
            ];
          }
          if (portfolio.dividendYield) {
            elementsObj.dividendYield = [
              Number(portfolio.dividendYield.min),
              Number(portfolio.dividendYield.max),
            ];
          }
          if (portfolio.foreignerRatio) {
            elementsObj.foreignerRatio = [
              Number(portfolio.foreignerRatio.min),
              Number(portfolio.foreignerRatio.max),
            ];
          }
          if (portfolio.sps) {
            elementsObj.sps = [
              Number(portfolio.sps.min),
              Number(portfolio.sps.max),
            ];
          }
          if (portfolio.saleAccount) {
            elementsObj.saleAccount = [
              Number(portfolio.saleAccount.min),
              Number(portfolio.saleAccount.max),
            ];
          }
          if (portfolio.crntRate) {
            elementsObj.crntRate = [
              Number(portfolio.crntRate.min),
              Number(portfolio.crntRate.max),
            ];
          }
          if (portfolio.lbltRate) {
            elementsObj.lbltRate = [
              Number(portfolio.lbltRate.min),
              Number(portfolio.lbltRate.max),
            ];
          }
          if (portfolio.ntinInrt) {
            elementsObj.ntinInrt = [
              Number(portfolio.ntinInrt.min),
              Number(portfolio.ntinInrt.max),
            ];
          }
          if (portfolio.bsopPrfiInrt) {
            elementsObj.bsopPrfiInrt = [
              Number(portfolio.bsopPrfiInrt.min),
              Number(portfolio.bsopPrfiInrt.max),
            ];
          }
          if (portfolio.grs) {
            elementsObj.grs = [
              Number(portfolio.grs.min),
              Number(portfolio.grs.max),
            ];
          }
          if (portfolio.roeVal) {
            elementsObj.roeVal = [
              Number(portfolio.roeVal.min),
              Number(portfolio.roeVal.max),
            ];
          }
          if (portfolio.bsopPrti) {
            elementsObj.bsopPrti = [
              Number(portfolio.bsopPrti.min),
              Number(portfolio.bsopPrti.max),
            ];
          }
          if (portfolio.thtrNtin) {
            elementsObj.thtrNtin = [
              Number(portfolio.thtrNtin.min),
              Number(portfolio.thtrNtin.max),
            ];
          }

          // 데이터가 있는 경우만 items 생성
          const hasData = Object.keys(elementsObj).length > 0;
          const snowflakeItems = hasData
            ? transformElementsToItems(elementsObj)
            : [];

          return {
            sharePortfolioId: item.sharePortfolioId,
            sharePortfolioTitle: item.portfolio.title,
            sharePortfolioDescription: item.portfolio.description || "",
            sharePortfolioImportCnt: item.loadCount,
            snowflakeP: {
              elements: elementsObj,
              items: snowflakeItems,
              hasData: hasData,
              market: item.portfolio.market || "",
              sectors: item.portfolio.sector || [],
            },
          };
        });

        setSharePortfolio(convertedData);
      } catch (error) {
        console.error("공유 포트폴리오 데이터 로딩 실패:", error);
      }
    };

    fetchSharePortfolio();
  }, [sortKey]);
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
          총 {sharePortfolio.length}개
        </S.SharePortfolioListCount>
        <SortDropdown
          options={["최신순", "인기순"]}
          selected={sortKey}
          onChange={setSortKey}
          icon={DropdownIcon}
        />
      </S.SharePortfolioListHeader>

      <S.SharePortfolioList>
        {sharePortfolio.map((portfolio) => (
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
