import PageHeader from "../../../components/pageHeader/PageHeader";
import PortfolioPage from "../PortfolioPage";
import * as S from "./SharePortfolioDetailPage.styled";

const SharePortfolioDetailPage = () => {
  const onClickSave = () => {
    alert("저장");
  };

  return (
    <S.PortfolioDetailContainer>
      <PageHeader
        title="포트폴리오 123"
        headerButtons={{
          rightText: "저장",
          onRightClick: onClickSave,
        }}
      />

      <S.PortfolioDetailContent>
        <PortfolioPage />
      </S.PortfolioDetailContent>
    </S.PortfolioDetailContainer>
  );
};

export default SharePortfolioDetailPage;
