import * as S from "./CommentList.styled";
import { CommentsData } from "../../../types/commentTypes";
import MoreIcon from "../../../assets/images/icons/more.png";
import { useState } from "react";

interface CommentListProps {
  commentsData: CommentsData;
}

const CommentList = ({ commentsData }: CommentListProps) => {
  const { commentsCnt, comments } = commentsData;
  // 임시
  const userId = 1;
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const handleToggleDropdown = (commentId: number) => {
    setOpenDropdownId((prev) => (prev === commentId ? null : commentId));
  };

  const handleEdit = (commentId: number) => {
    alert(`수정 : ${commentId}`);
    // TODO: 수정 로직
    setOpenDropdownId(null);
  };

  const handleDelete = (commentId: number) => {
    alert(`삭제 : ${commentId}`);
    // TODO: 삭제 로직
    setOpenDropdownId(null);
  };

  return (
    <S.CommentListContainer>
      <S.CommentListHeader>댓글 {commentsCnt}</S.CommentListHeader>

      {comments.map((comment) => (
        <S.Comment key={comment.commentId}>
          <S.CommentHeader>
            <S.CommentName>{comment.nickname}</S.CommentName>
            <S.CommentHeaderRight>
              <S.CommentDate>{comment.date}</S.CommentDate>
              {userId === comment.userId && (
                <S.CommentMore
                  src={MoreIcon}
                  onClick={() => handleToggleDropdown(comment.commentId)}
                />
              )}
            </S.CommentHeaderRight>
          </S.CommentHeader>
          <S.CommentContent>{comment.content}</S.CommentContent>

          {/* 드롭다운  */}
          {openDropdownId === comment.commentId && (
            <S.MoreDropdown>
              <S.MoreDropdownItem onClick={() => handleEdit(comment.commentId)}>
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
      ))}
    </S.CommentListContainer>
  );
};

export default CommentList;
