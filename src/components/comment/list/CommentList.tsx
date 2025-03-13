// CommentList.tsx
import * as S from "./CommentList.styled";
import { useState } from "react";
// import { useParams } from "react-router-dom";
import MoreIcon from "../../../assets/images/icons/more.png";

interface Comment {
  commentId: number;
  nickname: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  stockId: number;
  userId: string;
}

interface CommentsResponse {
  commentCnt?: number;
  commentsCnt?: number;
  comments: Comment[];
}

interface CommentsProps {
  data: CommentsResponse;
  handleDelete: (commentId: number) => Promise<void>;
  handleSaveEdit: (commentId: number) => Promise<void>;
  handleEdit: (commentId: number, currentContent: string) => void;
  handleCancelEdit: () => void;
  editingCommentId: number | null;
  editContent: string;
  setEditContent: React.Dispatch<React.SetStateAction<string>>;
}

const CommentList = ({
  data,
  handleDelete,
  handleSaveEdit,
  handleEdit,
  handleCancelEdit,
  editingCommentId,
  editContent,
  setEditContent,
}: CommentsProps) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  // const { num } = useParams<{ num: string }>();
  // const stockId = num ? parseInt(num, 10) : 1;
  const currentUserId = localStorage.getItem("userId");

  const handleToggleDropdown = (commentId: number) => {
    setOpenDropdownId((prev) => (prev === commentId ? null : commentId));
  };

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  // if (isLoading) {
  //   return <div>댓글을 불러오는 중...</div>;
  // }

  if (!data || !data.comments) {
    return <div>댓글을 불러올 수 없습니다.</div>;
  }
  console.log("ddd", data);

  return (
    <S.CommentListContainer>
      <S.CommentListHeader>
        댓글 {data.commentCnt ?? data.commentsCnt}
      </S.CommentListHeader>
      {data.comments.length === 0 ? (
        <S.NoComments>아직 댓글이 없습니다.</S.NoComments>
      ) : (
        data.comments.map((comment) => (
          <S.Comment key={comment.commentId}>
            <S.CommentHeader>
              <S.CommentName>{comment.nickname}</S.CommentName>
              <S.CommentHeaderRight>
                <S.CommentDate>{formatDate(comment.createdAt)}</S.CommentDate>
                {currentUserId === comment.userId && (
                  <S.CommentMore
                    src={MoreIcon}
                    onClick={() => handleToggleDropdown(comment.commentId)}
                  />
                )}
              </S.CommentHeaderRight>
            </S.CommentHeader>
            {editingCommentId === comment.commentId ? (
              <S.EditCommentContainer>
                <S.CommentInputTextarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <S.EditButtonContainer>
                  <S.EditButton
                    onClick={() => handleSaveEdit(comment.commentId)}
                  >
                    저장
                  </S.EditButton>
                  <S.EditButton onClick={handleCancelEdit}>취소</S.EditButton>
                </S.EditButtonContainer>
              </S.EditCommentContainer>
            ) : (
              <S.CommentContent>{comment.content}</S.CommentContent>
            )}

            {/* 드롭다운 */}
            {openDropdownId === comment.commentId &&
              editingCommentId !== comment.commentId && (
                <S.MoreDropdown>
                  <S.MoreDropdownItem
                    onClick={() =>
                      handleEdit(comment.commentId, comment.content)
                    }
                  >
                    수정
                  </S.MoreDropdownItem>
                  <S.MoreDropdownItem
                    onClick={() => handleDelete(comment.commentId)}
                  >
                    삭제
                  </S.MoreDropdownItem>
                </S.MoreDropdown>
              )}
          </S.Comment>
        ))
      )}
    </S.CommentListContainer>
  );
};

export default CommentList;
