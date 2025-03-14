import styled from "styled-components";

export const CommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #1a222d;
  padding: 60px;
`;

export const CommentListHeader = styled.div`
  color: #8d9197;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px solid #404040;
  padding: 20px 40px;
`;

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-bottom: 1px solid #404040;
  padding: 36px 40px;
  position: relative;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CommentName = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

export const CommentHeaderRight = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const CommentMore = styled.img`
  width: 18px;
  cursor: pointer;
`;

export const CommentDate = styled.div`
  color: #8d9197;
  font-size: 14px;
  font-weight: 400;
`;

export const CommentContent = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 30px;
`;

/* 드롭다운 */
export const MoreDropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 40px;
  width: 120px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const MoreDropdownItem = styled.div`
  padding: 16px;
  font-size: 14px;
  color: #000;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: #f2f2f3;
  }
`;
export const NoComments = styled.div`
  color: #8d9197;
  padding: 20px 0;
  text-align: center;
`;

export const EditCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const CommentInputTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  border-radius: 4px;
  border: 1px solid #2c333d;
  background: #1a222d;
  color: #fff;
  font-family: Pretendard;
  font-size: 14px;
  padding: 12px;
  box-sizing: border-box;
  resize: none;
`;

export const EditButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const EditButton = styled.button`
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  background: #2c333d;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background: #3a424e;
  }
`;
