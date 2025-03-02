import styled from "styled-components";
import PersonIcon from "../../../assets/images/icons/person_gray.png";
import Button from "../../button/Button";

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

const CommentInput = () => {
  const saveComment = () => {
    alert("댓글 저장");
  };

  return (
    <CommentInputContainer>
      <CommentInputHeader>
        <CommentInputImg src={PersonIcon} />
        <CommentInputName>이유진</CommentInputName>
      </CommentInputHeader>

      <CommentInputTextarea placeholder="포트폴리오에 대한 의견을 나누어 보세요." />
      <CommentButton>
        <Button text="저장" onClick={saveComment} />
      </CommentButton>
    </CommentInputContainer>
  );
};

export default CommentInput;
