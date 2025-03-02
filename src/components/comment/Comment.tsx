import styled from "styled-components";
import CommentInput from "./input/CommentInput";
import CommentList from "./list/CommentList";

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Comment = () => {
  return (
    <CommentContainer>
      <CommentInput />
      <CommentList />
    </CommentContainer>
  );
};

export default Comment;
