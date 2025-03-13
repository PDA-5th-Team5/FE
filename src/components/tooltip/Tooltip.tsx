import React from "react";
import styled from "styled-components";

interface TooltipProps {
  title: string;
  body: string;
  children: React.ReactNode; // 툴팁을 적용할 대상(버튼, 아이콘 등)
}

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;

  /* 마우스를 올렸을 때 툴팁이 보이도록 설정 */
  &:hover .tooltip-content {
    visibility: visible;
    opacity: 1;
  }
`;

const TooltipContent = styled.div`
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  position: absolute;
  bottom: 100%;
  left: 100%;
  transform: translate(0, 0);
  z-index: 999;

  background: #ffffff;
  padding: 12px 12px;
  border-radius: 8px;

  // 개행
  white-space: pre-wrap;
  word-break: keep-all;
  overflow-wrap: break-word;
  width: 200px;
`;

const Title = styled.div`
  color: #1b212d;
  font-weight: bold;
  font-size: 12px;
  font-family: "Pretendard", sans-serif;
  margin-bottom: 4px;
`;

const Body = styled.div`
  color: #1b212d;
  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  line-height: 14px;
  font-weight: normal;
`;

const Tooltip = ({ title, body, children }: TooltipProps) => {
  return (
    <TooltipContainer>
      {children}
      <TooltipContent className="tooltip-content">
        <Title>{title}</Title>
        <Body>{body}</Body>
      </TooltipContent>
    </TooltipContainer>
  );
};

export default Tooltip;
