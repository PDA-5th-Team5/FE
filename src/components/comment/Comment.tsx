// Comment.tsx
import styled from "styled-components";
import CommentInput from "./input/CommentInput";
import CommentList from "./list/CommentList";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 80px;
`;

const Comment = () => {
  const [refreshComments, setRefreshComments] = useState(false);
  const { num } = useParams<{ num: string }>();

  // 댓글 등록 후 목록 갱신을 위한 함수
  const handleCommentSubmitted = () => {
    setRefreshComments((prev) => !prev);
  };

  return (
    <CommentContainer>
      <CommentInput onCommentSubmitted={handleCommentSubmitted} />
      <CommentList key={refreshComments ? "refresh" : "initial"} />
    </CommentContainer>
  );
};

export default Comment;
