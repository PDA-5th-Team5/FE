import { useState } from "react";
import * as S from "./MyPortfolioPage.styled";
import DropdownIcon from "../../../assets/images/icons/arrowDown.png";
import PlusIcon from "../../../assets/images/icons/plus_blue.png";
import HeaderButtons from "../../../components/pageHeader/HeaderButtons";

const MyPortfolioPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [portfolioName, setPortfolioName] = useState("내 포트폴리오 123");

  const [portfolioList] = useState([
    "내 포트폴리오 123",
    "주식 공부용 포트폴리오",
    "ETF 전용 포트폴리오",
    "내 포트폴리오",
    "내 포트폴리오아무거나",
    "내 포트폴리오",
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

  return (
    <S.MyPortfolioPageContainer>
      <S.MyPortfolioPageHeader>
        <S.MyPortfolioNameContainer>
          <S.MyPortfolioName onClick={handleTitleClick}>
            {portfolioName}
            <S.DropdownIcon src={DropdownIcon} />
          </S.MyPortfolioName>

          <S.DropdownMenu isOpen={isOpen}>
            <S.DropdownItem isCount>총 {portfolioList.length}개</S.DropdownItem>
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
            <S.DropdownItem isCreateNew onClick={handleCreateNew}>
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
    </S.MyPortfolioPageContainer>
  );
};

export default MyPortfolioPage;
