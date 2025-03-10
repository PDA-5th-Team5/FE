// CommentList.tsx
import * as S from "./CommentList.styled";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MoreIcon from "../../../assets/images/icons/more.png";
import {
  getCommentsAPI,
  deleteCommentAPI,
  editCommentAPI,
} from "../../../apis/stock";

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
  commentCnt: number;
  comments: Comment[];
}

const CommentList = () => {
  const [commentsData, setCommentsData] = useState<CommentsResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const { num } = useParams<{ num: string }>();
  const stockId = num ? parseInt(num, 10) : 1;
  const [page, setPage] = useState(1);
  const size = 10;
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  // 하드코딩된 사용자 ID - 나중에 실제 로그인한 사용자 ID로 대체
  const currentUserId = "442d1d2b-bf61-41a8-b5dd-a9aec296aa07";

  useEffect(() => {
    fetchComments();
  }, [stockId, page]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const data = await getCommentsAPI(stockId, page, size);
      setCommentsData(data);
    } catch (error) {
      console.error("댓글 로딩 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleDropdown = (commentId: number) => {
    setOpenDropdownId((prev) => (prev === commentId ? null : commentId));
  };

  const handleEdit = (commentId: number, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditContent(currentContent);
    setOpenDropdownId(null);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
  };
  const handleSaveEdit = async (commentId: number) => {
    if (!editContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await editCommentAPI(stockId, commentId, editContent);
      alert("댓글이 수정되었습니다.");
      setEditingCommentId(null);
      setEditContent("");
      fetchComments(); // 댓글 목록 새로고침
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };
  const handleDelete = async (commentId: number) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        await deleteCommentAPI(stockId, commentId);
        alert("댓글이 삭제되었습니다.");
        fetchComments();
      } catch (error) {
        console.error("댓글 삭제 실패:", error);
        alert("댓글 삭제에 실패했습니다.");
      }
      setOpenDropdownId(null);
    }
  };

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  if (isLoading) {
    return <div>댓글을 불러오는 중...</div>;
  }

  if (!commentsData) {
    return <div>댓글을 불러올 수 없습니다.</div>;
  }

  return (
    <S.CommentListContainer>
      <S.CommentListHeader>댓글 {commentsData.commentCnt}</S.CommentListHeader>

      {commentsData.comments.length === 0 ? (
        <S.NoComments>아직 댓글이 없습니다.</S.NoComments>
      ) : (
        commentsData.comments.map((comment) => (
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
            {openDropdownId === comment.commentId && (
              <S.MoreDropdown>
                <S.MoreDropdownItem
                  onClick={() => handleEdit(comment.commentId, comment.content)}
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
