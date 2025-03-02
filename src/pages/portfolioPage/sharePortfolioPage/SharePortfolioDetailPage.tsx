import Comments from "../../../components/comment/Comment";
import PageHeader from "../../../components/pageHeader/PageHeader";
import { CommentsData } from "../../../types/commentTypes";
import PortfolioPage from "../PortfolioPage";
import * as S from "./SharePortfolioDetailPage.styled";

const SharePortfolioDetailPage = () => {
  const commentsData: CommentsData = {
    commentsCnt: 12,
    comments: [
      {
        commentId: 1,
        nickname: "김도은",
        userId: 2,
        content: "댓글내용 1",
        date: "2024.02.18",
      },
      {
        commentId: 2,
        nickname: "이수용",
        userId: 1,
        content: "댓글내용 2",
        date: "2024.02.18",
      },
    ],
  };
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

      <S.PortfolioDetailComments>
        <Comments commentsData={commentsData} />
      </S.PortfolioDetailComments>
    </S.PortfolioDetailContainer>
  );
};

export default SharePortfolioDetailPage;
