import styled from "styled-components";
import CommentInput from "./input/CommentInput";
import CommentList from "./list/CommentList";
import { CommentsData } from "../../types/commentTypes";

interface CommentsProps {
  commentsData: CommentsData;
}

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 80px;
`;

const Comment = ({ commentsData }: CommentsProps) => {
  return (
    <CommentContainer>
      <CommentInput />
      <CommentList commentsData={commentsData} />
    </CommentContainer>
  );
};

export default Comment;
