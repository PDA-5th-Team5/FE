import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: #151b24;
  border-bottom: 1px solid #3c4049;
`;

export const HeaderWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

export const HeaderLink = styled(NavLink)`
  text-decoration: none;
  color: #8b8c90;

  &.active {
    color: #fff;
    font-weight: 700;
  }
`;

export const HeaderImg = styled.img`
  width: 131px;
  height: 24px;
`;

export const HeaderUl = styled.ul`
  display: flex;
  list-style: none;
`;

export const HeaderLi = styled.li`
  display: flex;
  align-items: center;
  margin-left: 70px;
  padding: 11px 0px;
  position: relative;
`;

export const HeaderLoginIcon = styled.img<{ $isOpen: boolean }>`
  width: 24px;
  height: 24px;
  cursor: pointer;
  rotate: ${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")};
`;

export const HeaderSearchWrapper = styled.div`
  position: relative;
`;

export const HeaderSearch = styled.input`
  width: 304px;
  height: 16px;
  border-radius: 8px;
  border: 1px solid #3c4049;
  background: #272e3b;
  padding: 12px 24px 12px 50px;
  color: #fff;
`;

export const HeaderSearchIcon = styled.img`
  height: 24px;
  position: absolute;
  left: 18px;
  top: 9px;
  cursor: pointer;
`;

// 드롭다운
export const UserDropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 160px;
  background: #272e3a;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 9999;
`;

export const UserDropdownItem = styled.div`
  padding: 16px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #2595e0;
  }
`;

export const loginSignupButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 124px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: #2595e0;
  color: #fff;
  font-family: "Pretendard";
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #1e7ec0;
  }
`;
