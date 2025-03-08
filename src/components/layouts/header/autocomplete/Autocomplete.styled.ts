import styled from "styled-components";

export const AutocompleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40px;
  width: 100%;
  max-height: 420px;
  border-radius: 8px;
  border: 1px solid #3c4049;
  background: #1b212d;
  z-index: 999;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #272e3b;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8b8c90;
    border-radius: 4px;
  }
`;

export const AutocompleteItem = styled.div`
  display: flex;
  gap: 16px;
  border-bottom: 1px solid #2c313c;
  padding: 12px 28px;
  cursor: pointer;

  &:hover {
    background-color: #2d323f;
  }
`;

export const AutocompleteImg = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 8px;
`;

export const AutocompleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const AutocompleteName = styled.div`
  color: #fff;
  font-size: 14px;
`;

export const AutocompleteTicker = styled.div`
  color: #b8b9ba;
  font-size: 14px;
`;
