import styled from "styled-components";

export const MyPortfolioPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
`;

export const MyPortfolioPageHeader = styled.div`
  position: relative;
  display: inline-block;
`;

export const MyPortfolioName = styled.div`
  display: flex;
  gap: 4px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const DropdownIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const DropdownMenu = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 110%;
  left: 0;
  width: 300px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #3c4049;
  margin: 0;
  padding: 8px 0;
  list-style: none;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 1000;
  box-sizing: border-box;
`;

export const DropdownItemScroll = styled.div`
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8b8c90;
    border-radius: 4px;
  }
`;

export const PlusIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const Separator = styled.hr`
  border: 0;
  border-top: 1px solid #f2f2f3;
`;

export const DropdownItem = styled.li<{
  isCreateNew?: boolean;
  isCount?: boolean;
  selected?: boolean;
}>`
  font-size: 16px;
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  /* font-weight: ${({ selected }) => (selected ? "700" : "400")}; */
  background: ${({ selected }) => (selected ? "#2394DF" : "transparent")};
  padding: 20px 24px;
  cursor: pointer;

  ${({ isCount, selected }) =>
    !isCount &&
    !selected &&
    `
      &:hover {
        background: #f2f2f3;
      }
  `}

  ${({ isCreateNew }) =>
    isCreateNew &&
    `
      display: flex;
      gap: 12px;
      align-items: center;
  `}

  ${({ isCount }) =>
    isCount &&
    `
      color: #5F6875;
      font-size: 12px;
      padding: 12px 24px;
      cursor: default;
  `}
`;
