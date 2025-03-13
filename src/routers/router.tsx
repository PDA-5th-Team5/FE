import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import MainPage from "../pages/mainPage/MainPage";
import LoginPage from "../pages/loginPage/LoginPage";
import SignupPage from "../pages/signupPage/SignupPage";
import MyPage from "../pages/myPage/MyPage";
import MyPortfolioPage from "../pages/portfolioPage/myPortfolioPage/MyPortfolioPage";
import SharePortfolioPage from "../pages/sharePortfolioPage/SharePortfolioPage";
import SharePortfolioDetailPage from "../pages/portfolioPage/sharePortfolioPage/SharePortfolioDetailPage";
import StockPage from "../pages/stockPage/StockPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { element: <MainPage />, index: true },
      { element: <LoginPage />, path: "login" },
      { element: <SignupPage />, path: "signup" },
      {
        element: <ProtectedRoute />,
        children: [
          { element: <MyPage />, path: "mypage" },
          { element: <MyPortfolioPage />, path: "portfolio/my/:num" },
        ],
      },
      { element: <SharePortfolioPage />, path: "portfolio/share" },
      { element: <SharePortfolioDetailPage />, path: "portfolio/share/:num" },
      { element: <StockPage />, path: "stock/:num" },
    ],
  },
]);

export default router;
