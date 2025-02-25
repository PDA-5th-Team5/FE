import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";
import * as S from "./Layout.styled";

const Layout: FC = () => {
  const location = useLocation();

  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <S.LayoutContainer>
      {!isLoginPage && <Header />}
      <S.ContentWrapper>
        <Outlet />
      </S.ContentWrapper>
    </S.LayoutContainer>
  );
};

export default Layout;
