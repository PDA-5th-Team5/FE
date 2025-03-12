import { useState } from "react";
import styled from "styled-components";
import PersonIcon from "../../../assets/images/icons/person_gray.png";
import Button from "../../button/Button";
import { createCommentAPI } from "../../../apis/stock";
import { createPortfolioCommentAPI } from "../../../apis/portfolio";
import { useParams } from "react-router-dom";
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
}

const CommentInput = ({
  onCommentSubmitted,
  pageType = "stock",
}: CommentInputProps) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { num } = useParams<{ num: string }>();

  const saveComment = async () => {
    if (!content.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      // console.log("URL 파라미터 id:", num);
      const stockId = num ? parseInt(num, 10) : 1;
      const sharePortfolioId = num ? parseInt(num, 10) : 1;
      console.log("페이지 타입:", pageType);

      if (isNaN(stockId)) {
        console.error("ID 파싱 실패:", num);
        throw new Error("주식 ID를 변환할 수 없습니다");
      }

      if (stockId === 0) {
        throw new Error("유효하지 않은 주식 ID입니다");
      }
      console.log("타입 비교:", {
        pageType,
        isPortfolio: pageType === "portfolio",
        isTypeOf: typeof pageType,
      });
      // 페이지 타입에 따라 다른 API 호출
      if (pageType === "stock") {
        console.log("주식 ID:", stockId);

        await createCommentAPI(stockId, content);
      } else if (pageType === "portfolio") {
        console.log("포트폴리오 ID:", sharePortfolioId);
        console.log("포트폴리오 ID:", sharePortfolioId);

        await createPortfolioCommentAPI(sharePortfolioId, content); // 포트폴리오 댓글 API 함수 필요
      }

      setContent("");
      alert("댓글이 저장되었습니다.");
      // 댓글 저장 후 목록 갱신 호출
      if (onCommentSubmitted) {
        onCommentSubmitted();
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
        <CommentInputName>이유진</CommentInputName>
      </CommentInputHeader>

      <CommentInputTextarea
        placeholder={
          pageType === "stock"
            ? "주식에 대한 의견을 나누어 보세요."
            : "포트폴리오오에 대한 의견을 나누어 보세요."
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
