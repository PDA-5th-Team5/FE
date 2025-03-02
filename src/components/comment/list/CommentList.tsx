import styled from "styled-components";
import { CommentsData } from "../../../types/commentTypes";

interface CommentListProps {
  commentsData: CommentsData;
}

const CommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #1a222d;
  padding: 60px;
`;

const CommentListHeader = styled.div`
  color: #8d9197;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px solid #404040;
  padding: 20px 40px;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-bottom: 1px solid #404040;
  padding: 36px 40px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentName = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

const CommentDate = styled.div`
  color: #8d9197;
  font-size: 14px;
  font-weight: 400;
`;

const CommentContent = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 30px;
`;

const CommentList = ({ commentsData }: CommentListProps) => {
  const { commentsCnt, comments } = commentsData;
  return (
    <CommentListContainer>
      <CommentListHeader>댓글 {commentsCnt}</CommentListHeader>

      {comments.map((comment) => (
        <Comment key={comment.commentId}>
          <CommentHeader>
            <CommentName>{comment.nickname}</CommentName>
            <CommentDate>{comment.date}</CommentDate>
          </CommentHeader>
          <CommentContent>{comment.content}</CommentContent>
        </Comment>
      ))}
    </CommentListContainer>
  );
};

export default CommentList;
