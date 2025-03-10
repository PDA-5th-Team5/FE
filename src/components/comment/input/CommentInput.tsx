import { useState } from "react";
import styled from "styled-components";
import PersonIcon from "../../../assets/images/icons/person_gray.png";
import Button from "../../button/Button";
import { createCommentAPI } from "../../../apis/stock";
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
}

const CommentInput = ({ onCommentSubmitted }: CommentInputProps) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { num } = useParams<{ num: string }>();

  // 하드코딩된 토큰
  const TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6IjQ0MmQxZDJiLWJmNjEtNDFhOC1iNWRkLWE5YWVjMjk2YWEwNyIsInVzZXJuYW1lIjoiZG9ldW4iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImlhdCI6MTc0MTQyNDIwMSwiZXhwIjoxNzQzMjM4NjAxfQ.usL6NNlWHn9x8wGbmxqpCMFpwrOJNkA9hhJQYLgzV-A";

  const saveComment = async () => {
    if (!content.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      console.log("URL 파라미터 id:", num);
      const stockId = num ? parseInt(num, 10) : 1;
      if (isNaN(stockId)) {
        console.error("ID 파싱 실패:", num);
        throw new Error("주식 ID를 변환할 수 없습니다");
      }

      if (stockId === 0) {
        throw new Error("유효하지 않은 주식 ID입니다");
      }

      // 토큰을 localStorage에 저장
      localStorage.setItem("accessToken", TOKEN);

      await createCommentAPI(stockId, content);

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
        placeholder="주식에 대한 의견을 나누어 보세요."
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
