import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import SortDropdown from "../../components/sortDropdown/SortDropdown";
import * as S from "./SharePortfolioPage.styled";
import DropdownIcon from "../../assets/images/icons/arrowDonw_gray.png";
import PortfolioCard from "./portfolioCard/PortfolioCard";
import { SnowflakeP } from "../../types/snowflakeTypes";
import { sharePortfolioListAPI } from "../../apis/portfolio";
import { transformElementsToItems } from "../../utils/snowflakeUtils";

export interface SharePortfolio {
  sharePortfolioId: number;
  sharePortfolioTitle: string;
  sharePortfolioDescription: string;
  sharePortfolioImportCnt: number;
  snowflakeP: SnowflakeP;
}

const SharePortfolioPage = () => {
  // 정렬 기준 상태 ("최신순", "인기순" 등)
  const [sortKey, setSortKey] = useState("최신순");
  // 공유 포트폴리오 목록
  const [sharePortfolio, setSharePortfolio] = useState<SharePortfolio[]>([]);
  // 무한 스크롤 관련 상태들
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const { ref, inView } = useInView();

  // 페이지 번호를 받아 API로 데이터를 불러오고, 기존 데이터에 추가하는 함수
  const fetchSharePortfolio = async (currentPage: number) => {
    try {
      const sortKeyMap: { [key: string]: string } = {
        최신순: "createdAt",
        인기순: "loadCount",
      };
      const apiSortKey = sortKeyMap[sortKey] || "loadCount";
      const response = await sharePortfolioListAPI(apiSortKey, currentPage);

      // API 응답 데이터를 컴포넌트 형식으로 변환
      const convertedData = response.map((item) => {
        // 각 항목의 elements 객체 구성
        const elementsObj: { [key: string]: number[] } = {};
        const portfolio = item.portfolio;

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

      // 페이지 0이면 초기화, 아니면 기존 데이터에 추가
      if (currentPage === 0) {
        setSharePortfolio(convertedData);
      } else {
        setSharePortfolio((prev) => [...prev, ...convertedData]);
      }
      // 응답이 비어있다면 더 이상 불러올 데이터가 없다고 처리
      if (response.length === 0) {
        setIsLast(true);
      }
    } catch (error) {
      console.error("공유 포트폴리오 데이터 로딩 실패:", error);
    }
  };

  // sortKey 변경 시 초기 데이터 로드 (page 0부터)
  useEffect(() => {
    setPage(0);
    setIsLast(false);
    setIsLoading(true);
    fetchSharePortfolio(0).finally(() => setIsLoading(false));
  }, [sortKey]);

  // 무한 스크롤: Sentinel 요소(inView)가 화면에 보이면 다음 페이지 로드
  useEffect(() => {
    if (inView && !isLoading && !isLast) {
      setTimeout(() => {
        setIsLoading(true);
        fetchSharePortfolio(page + 1).finally(() => {
          setPage((prev) => prev + 1);
          setIsLoading(false);
        });
      }, 10);
    }
  }, [inView, isLoading, isLast, page]);

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
        {/* 무한 스크롤 감지용 요소 */}
        <div ref={ref} />
      </S.SharePortfolioList>
    </S.SharePortfolioListContainer>
  );
};

export default SharePortfolioPage;
