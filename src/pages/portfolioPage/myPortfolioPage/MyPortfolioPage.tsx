import * as S from "./MyPortfolioPage.styled";
import DropdownIcon from "../../../assets/images/icons/arrowDown.png";
import PlusIcon from "../../../assets/images/icons/plus_blue.png";
import HeaderButtons from "../../../components/pageHeader/HeaderButtons";
import PortfolioPage from "../PortfolioPage";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyPortfolioDetailAPI } from "../../../apis/portfolio";
import { transformElementsToItems } from "../../../utils/snowflakeUtils";
const MyPortfolioPage = () => {
  const { num } = useParams<{ num: string }>();

  const [portfolio, setPortfolio] = useState<PortfolioDetailResponse | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const [portfolioName, setPortfolioName] = useState("내 포트폴리오 123");
  const [elementsObj, setElementsObj] = useState<{ [key: string]: number[] }>(
    {}
  );
  const [snowflakeItems, setSnowflakeItems] = useState<any[]>([]);
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentsData, setCommentsData] = useState({
    commentCnt: 0,
    comments: [],
  });
  const [portfolioList] = useState([
    "내 포트폴리오 123",
    "주식 공부용 포트폴리오",
    "ETF 전용 포트폴리오",
    "내 포트폴리오",
    "내 포트폴리오아무거나",
  ]);

  const handleTitleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (name: string) => {
    setPortfolioName(name);
    setIsOpen(false);
  };

  const handleCreateNew = () => {
    alert("새로운 포트폴리오 만들기");
    setIsOpen(false);
  };

  const onClickDelete = () => {
    alert("삭제되었습니다");
  };

  const onClickShare = () => {
    alert("공유되었습니다");
  };
  useEffect(() => {
    const fetchPortfolioDetail = async () => {
      try {
        setLoading(true);
        const portfolioId = parseInt(num || "0", 10);

        if (!portfolioId) {
          throw new Error("유효하지 않은 포트폴리오 ID");
        }

        const response = await getMyPortfolioDetailAPI(portfolioId);
        console.log("전체 응답:", response);
        console.log("제목", response.title);
        console.log("설명", response.description);

        setPortfolio(response);

        // 재무 지표 데이터 추출
        const tempElements: { [key: string]: number[] } = {};

        // 모든 가능한 재무 지표 확인
        if (response.marketCap) {
          tempElements.marketCap = [
            Number(response.marketCap.min),
            Number(response.marketCap.max),
          ];
        }
        if (response.per) {
          tempElements.per = [
            Number(response.per.min),
            Number(response.per.max),
          ];
        }
        if (response.eps) {
          tempElements.eps = [
            Number(response.eps.min),
            Number(response.eps.max),
          ];
        }
        if (response.bps) {
          tempElements.bps = [
            Number(response.bps.min),
            Number(response.bps.max),
          ];
        }
        if (response.pbr) {
          tempElements.pbr = [
            Number(response.pbr.min),
            Number(response.pbr.max),
          ];
        }
        if (response.dividendYield) {
          tempElements.dividendYield = [
            Number(response.dividendYield.min),
            Number(response.dividendYield.max),
          ];
        }
        if (response.foreignerRatio) {
          tempElements.foreignerRatio = [
            Number(response.foreignerRatio.min),
            Number(response.foreignerRatio.max),
          ];
        }
        if (response.sps) {
          tempElements.sps = [
            Number(response.sps.min),
            Number(response.sps.max),
          ];
        }
        if (response.saleAccount) {
          tempElements.saleAccount = [
            Number(response.saleAccount.min),
            Number(response.saleAccount.max),
          ];
        }
        if (response.crntRate) {
          tempElements.crntRate = [
            Number(response.crntRate.min),
            Number(response.crntRate.max),
          ];
        }
        if (response.lbltRate) {
          tempElements.lbltRate = [
            Number(response.lbltRate.min),
            Number(response.lbltRate.max),
          ];
        }
        if (response.ntinInrt) {
          tempElements.ntinInrt = [
            Number(response.ntinInrt.min),
            Number(response.ntinInrt.max),
          ];
        }
        if (response.bsopPrfiInrt) {
          tempElements.bsopPrfiInrt = [
            Number(response.bsopPrfiInrt.min),
            Number(response.bsopPrfiInrt.max),
          ];
        }
        if (response.grs) {
          tempElements.grs = [
            Number(response.grs.min),
            Number(response.grs.max),
          ];
        }
        if (response.roeVal) {
          tempElements.roeVal = [
            Number(response.roeVal.min),
            Number(response.roeVal.max),
          ];
        }
        if (response.bsopPrti) {
          tempElements.bsopPrti = [
            Number(response.bsopPrti.min),
            Number(response.bsopPrti.max),
          ];
        }
        if (response.thtrNtin) {
          tempElements.thtrNtin = [
            Number(response.thtrNtin.min),
            Number(response.thtrNtin.max),
          ];
        }

        setElementsObj(tempElements);

        // 데이터 존재 여부 확인
        const hasFinancialData = Object.keys(tempElements).length > 0;
        setHasData(hasFinancialData);

        // 스노우플레이크 아이템 생성
        if (hasFinancialData) {
          const items = transformElementsToItems(tempElements);
          setSnowflakeItems(items);
        }

        setLoading(false);
      } catch (err) {
        console.error("포트폴리오 상세 정보 로딩 실패:", err);
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
        setLoading(false);
      }
    };

    fetchPortfolioDetail();
  }, [num]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  if (!portfolio) {
    return <div>포트폴리오를 찾을 수 없습니다.</div>;
  }
  return (
    <S.MyPortfolioPageContainer>
      <S.MyPortfolioPageHeader>
        <S.MyPortfolioNameContainer>
          <S.MyPortfolioName onClick={handleTitleClick}>
            {portfolioName}
            <S.DropdownIcon src={DropdownIcon} />
          </S.MyPortfolioName>

          <S.DropdownMenu $isOpen={isOpen}>
            <S.DropdownItem $isCount>
              총 {portfolioList.length}개
            </S.DropdownItem>
            <S.DropdownItemScroll>
              {portfolioList.map((name) => (
                <S.DropdownItem
                  key={name}
                  onClick={() => handleSelect(name)}
                  selected={name === portfolioName}
                >
                  {name}
                </S.DropdownItem>
              ))}
            </S.DropdownItemScroll>
            <S.Separator />
            <S.DropdownItem $isCreateNew onClick={handleCreateNew}>
              <S.PlusIcon src={PlusIcon} />
              새로운 포트폴리오 만들기
            </S.DropdownItem>
          </S.DropdownMenu>
        </S.MyPortfolioNameContainer>

        <HeaderButtons
          leftText="삭제"
          onLeftClick={onClickDelete}
          rightText="공유"
          onRightClick={onClickShare}
        />
      </S.MyPortfolioPageHeader>

      <PortfolioPage
        portfolioData={portfolio}
        elementsObj={elementsObj}
        snowflakeItems={snowflakeItems}
      />
    </S.MyPortfolioPageContainer>
  );
};

export default MyPortfolioPage;
