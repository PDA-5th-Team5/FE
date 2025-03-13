import { useEffect, useState } from "react";
import styled from "styled-components";
import PersonIcon from "../../../assets/images/icons/person_gray.png";
import Button from "../../button/Button";
import { createCommentAPI } from "../../../apis/stock";
import { createPortfolioCommentAPI } from "../../../apis/portfolio";
import { useParams } from "react-router-dom";
import { CommentsResponse } from "../../../apis/stock";
const CommentInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CommentInputHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CommentInputImg = styled.img`
  width: 24px;
  height: 24px;
`;

const CommentInputName = styled.div`
  color: #8d9197;
  font-size: 18px;
  font-weight: 700;
`;

const CommentInputTextarea = styled.textarea`
  height: 160px;
  border-radius: 8px;
  border: 1px solid #2c333d;
  background: #1a222d;
  color: #fff;
  font-family: Pretendard;
  font-size: 14px;
  padding: 20px;
  box-sizing: border-box;
  resize: none;
`;

const CommentButton = styled.div`
  display: flex;
  justify-content: end;
`;

interface CommentInputProps {
  onCommentSubmitted?: () => void;
  pageType?: "stock" | "portfolio";
  fetchComments: () => Promise<CommentsResponse>;
}

const CommentInput = ({
  onCommentSubmitted,
  pageType = "stock",
  fetchComments,
}: CommentInputProps) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { num } = useParams<{ num: string }>();
  const location = window.location.pathname;
  const actualPageType = location.includes("/portfolio")
    ? "portfolio"
    : pageType;
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    const fetchNickname = localStorage.getItem("nickname");
    setNickname(fetchNickname);
  }, []);

  const saveComment = async () => {

    if (sessionStorage.getItem("isLoggedIn") !== "true") {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    if (!content.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const stockId = num ? parseInt(num, 10) : 1;
      const sharePortfolioId = num ? parseInt(num, 10) : 1;

      if (isNaN(stockId)) {
        console.error("ID 파싱 실패:", num);
        throw new Error("주식 ID를 변환할 수 없습니다");
      }

      if (stockId === 0) {
        throw new Error("유효하지 않은 주식 ID입니다");
      }

      // 페이지 타입에 따라 다른 API 호출
      if (actualPageType === "stock") {
        await createCommentAPI(stockId, content);
      } else if (actualPageType === "portfolio") {
        await createPortfolioCommentAPI(sharePortfolioId, content);
      }

      setContent("");
      alert("댓글이 저장되었습니다.");

      // 댓글 저장 후 목록 갱신 호출
      if (onCommentSubmitted) {
        onCommentSubmitted();
        fetchComments();
      }
    } catch (error) {
      console.error("댓글 저장 실패:", error);
      alert("댓글 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CommentInputContainer>
      <CommentInputHeader>
        <CommentInputImg src={PersonIcon} />
        <CommentInputName>{nickname}</CommentInputName>
      </CommentInputHeader>

      <CommentInputTextarea
        placeholder={
          actualPageType === "stock"
            ? "주식에 대한 의견을 나누어 보세요."
            : "포트폴리오에 대한 의견을 나누어 보세요."
        }
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <CommentButton>
        <Button
          text={isLoading ? "저장 중..." : "저장"}
          onClick={saveComment}
          //   disabled={isLoading}
        />
      </CommentButton>
    </CommentInputContainer>
  );
};

export default CommentInput;
