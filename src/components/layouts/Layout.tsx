import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";

const Layout: FC = () => {
  const location = useLocation();

  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <div
        style={{
          backgroundColor: "#151B24",
          minHeight: "100vh",
        }}
      >
        {isLoginPage ? null : <Header />}

        <Outlet />
      </div>
    </>
  );
};

export default Layout;
