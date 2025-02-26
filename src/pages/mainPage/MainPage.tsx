import * as S from "./MainPage.styled";

const MainPage: React.FC = () => {
  return (
    <S.MainPageContainer>
      <S.MainPageHeader>
        <S.MainPageTitle>Stock Snowper</S.MainPageTitle>
        <S.MainPageHeaderButtonWrapper>
          <S.MainPageHeaderReset>초기화</S.MainPageHeaderReset>
          <S.MainPageHeaderButton>저장</S.MainPageHeaderButton>
        </S.MainPageHeaderButtonWrapper>
      </S.MainPageHeader>
    </S.MainPageContainer>
  );
};

export default MainPage;
