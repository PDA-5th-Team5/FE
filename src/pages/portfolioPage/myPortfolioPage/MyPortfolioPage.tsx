import { useEffect, useState } from "react";
import * as S from "./MyPortfolioPage.styled";
import DropdownIcon from "../../../assets/images/icons/arrowDown.png";
import PlusIcon from "../../../assets/images/icons/plus_blue.png";
import HeaderButtons from "../../../components/pageHeader/HeaderButtons";
import PortfolioPage from "../PortfolioPage";
import { myPortfolioListAPI } from "../../../apis/portfolio"; // 나의 포트폴리오 리스트 API 가져오기
import { MyPortfolio } from "../../../types/portfolioTypes"; // 타입 추가

const MyPortfolioPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<number | null>(null);
  const [portfolioList, setPortfolioList] = useState<MyPortfolio[]>([]);

  useEffect(() => {
    // 나의 포트폴리오 리스트 불러오기
    const fetchMyPortfolios = async () => {
      try {
        const response = await myPortfolioListAPI(); // API 호출
        console.log("포트폴리오 데이터:", response); // 응답 데이터 확인

        if (response.myPortfoliosCnt > 0) {
          setPortfolioList(response.myPortfolios);
          setSelectedPortfolioId(response.myPortfolios[0].myPortfolioId); // 첫 번째 포트폴리오 ID를 기본값으로 설정
        }
      } catch (error) {
        console.error("나의 포트폴리오 리스트 불러오기 실패:", error);
      }
    };

    fetchMyPortfolios();
  }, []);

  const handleTitleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (portfolioId: number) => {
    setSelectedPortfolioId(portfolioId);
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

  return (
    <S.MyPortfolioPageContainer>
      <S.MyPortfolioPageHeader>
        <S.MyPortfolioNameContainer>
          <S.MyPortfolioName onClick={handleTitleClick}>
            {
              portfolioList.find((p) => p.myPortfolioId === selectedPortfolioId)
                ?.myPortfolioTitle || "포트폴리오 없음"
            }
            <S.DropdownIcon src={DropdownIcon} />
          </S.MyPortfolioName>

          {portfolioList.length > 0 && (
            <S.DropdownMenu $isOpen={isOpen}>
              <S.DropdownItem $isCount>
                총 {portfolioList.length}개
              </S.DropdownItem>
              <S.DropdownItemScroll>
                {portfolioList.map((portfolio) => (
                  <S.DropdownItem
                    key={portfolio.myPortfolioId}
                    onClick={() => handleSelect(portfolio.myPortfolioId)}
                    selected={portfolio.myPortfolioId === selectedPortfolioId}
                  >
                    {portfolio.myPortfolioTitle}
                  </S.DropdownItem>
                ))}
              </S.DropdownItemScroll>
              <S.Separator />
              <S.DropdownItem $isCreateNew onClick={handleCreateNew}>
                <S.PlusIcon src={PlusIcon} />
                새로운 포트폴리오 만들기
              </S.DropdownItem>
            </S.DropdownMenu>
          )}
        </S.MyPortfolioNameContainer>

        <HeaderButtons
          leftText="삭제"
          onLeftClick={onClickDelete}
          rightText="공유"
          onRightClick={onClickShare}
        />
      </S.MyPortfolioPageHeader>

      <PortfolioPage />
    </S.MyPortfolioPageContainer>
  );
};

export default MyPortfolioPage;