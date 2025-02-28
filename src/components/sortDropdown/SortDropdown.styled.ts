import styled from "styled-components";

export const SortDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const SortDropdownButton = styled.button`
  display: flex;
  gap: 4px;
  background: none;
  border: none;
  color: #babbbd;
  font-family: Pretendard;
  font-size: 12px;
  cursor: pointer;
  border-radius: 8px;
  padding: 9px 12px;

  &:hover {
    background: #21272f;
  }
`;

export const SortKeyIcon = styled.img`
  width: 14px;
`;

export const SortDropdownMenu = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 44px;
  left: 0;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 8px 0;
  margin: 0;
  list-style: none;
  width: 132px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  box-sizing: border-box;
`;

export const SortDropdownItem = styled.li<{ selected?: boolean }>`
  padding: 8px 16px;
  font-size: 12px;
  font-weight: ${({ selected }) => (selected ? "700" : "400")};
  color: ${({ selected }) => (selected ? "#fff" : "#333")};
  background: ${({ selected }) => (selected ? "#2394DF" : "transparent")};
  cursor: pointer;

  &:hover {
    background: ${({ selected }) => (selected ? "#2394DF" : "#D7D7D7")};
  }
`;
