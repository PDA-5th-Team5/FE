import styled from "styled-components";

const CommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #1a222d;
  padding: 60px;
`;

const CommentListHeader = styled.div`
  color: #8d9197;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px solid #404040;
  padding: 20px 40px;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-bottom: 1px solid #404040;
  padding: 36px 40px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentName = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

const CommentDate = styled.div`
  color: #8d9197;
  font-size: 14px;
  font-weight: 400;
`;

const CommentContent = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 30px;
`;

const CommentList = () => {
  return (
    <CommentListContainer>
      <CommentListHeader>댓글 7</CommentListHeader>
      <Comment>
        <CommentHeader>
          <CommentName>이유진</CommentName>
          <CommentDate>2025.10.12</CommentDate>
        </CommentHeader>
        <CommentContent>
          이 포트폴리오는 정말 최곱니다.이 포트폴리오는 정말 최곱니다.이
          포트폴리오는 정말 최곱니다.이 포트폴리오는 정말 최곱니다.이
          포트폴리오는 정말 최곱니다.이 포트폴리오는 정말 최곱니다.이
          포트폴리오는 정말 최곱니다.이 포트폴리오는 정말 최곱니다.이
          포트폴리오는 정말 최곱니다.이 포트폴리오는 정말 최곱니다.
        </CommentContent>
      </Comment>
    </CommentListContainer>
  );
};

export default CommentList;
