import * as S from "./PortfolioPage.styled";

const PortfolioPage = () => {
  const onClickDelete = () => {
    alert("삭제되었습니다");
  };

  const onClickShare = () => {
    alert("공유되었습니다");
  };

  return (
    <S.PortfolioPageContainer>
      {/* <PortfolioHeader
        title="테스트"
        headerButtons={{
          leftText: "삭제",
          onLeftClick: onClickDelete,
          rightText: "공유",
          onRightClick: onClickShare,
        }}
      /> */}
    </S.PortfolioPageContainer>
  );
};

export default PortfolioPage;
