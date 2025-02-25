import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 120px;
  background-color: #151b24;
  font-size: 14px;
  border-bottom: 1px solid #3c4049;
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
  padding: 10px 0px;
`;

export const HeaderLoginIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
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
