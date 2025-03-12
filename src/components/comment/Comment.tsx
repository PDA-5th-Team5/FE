// Comment.tsx
import styled from "styled-components";
import CommentInput from "./input/CommentInput";
import CommentList from "./list/CommentList";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CommentsResponse } from "../../apis/stock";

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 80px;
`;

interface CommentProps {
  data: CommentsResponse;
  handleDelete: (commentId: number) => Promise<void>;
  handleSaveEdit: (commentId: number) => Promise<void>;
  handleEdit: (commentId: number, currentContent: string) => void;
  handleCancelEdit: () => void;
  editingCommentId: number | null;
  editContent: string;
  setEditContent: React.Dispatch<React.SetStateAction<string>>;
  pageType?: "stock" | "portfolio";
}

const Comment = ({
  data,
  handleDelete,
  handleSaveEdit,
  handleEdit,
  handleCancelEdit,
  editingCommentId,
  editContent,
  setEditContent,
  pageType = "stock",
}: CommentProps) => {
  const [refreshComments, setRefreshComments] = useState(false);
  const { num } = useParams<{ num: string }>();

  // 댓글 등록 후 목록 갱신을 위한 함수
  const handleCommentSubmitted = () => {
    setRefreshComments((prev) => !prev);
  };

  return (
    <CommentContainer>
      <CommentInput
        onCommentSubmitted={handleCommentSubmitted}
        pageType={pageType}
      />
      <CommentList
        key={refreshComments ? "refresh" : "initial"}
        data={data}
        handleDelete={handleDelete}
        handleSaveEdit={handleSaveEdit}
        handleEdit={handleEdit}
        handleCancelEdit={handleCancelEdit}
        editingCommentId={editingCommentId}
        editContent={editContent}
        setEditContent={setEditContent}
      />
    </CommentContainer>
  );
};

export default Comment;
