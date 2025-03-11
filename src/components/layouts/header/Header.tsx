import { FC, useEffect, useState } from "react";
import * as S from "./Header.styled";
import Logo from "../../../assets/images/logo.png";
import ArrowDownIcon from "../../../assets/images/icons/arrowDown.png";
import PersonIcon from "../../../assets/images/icons/person.png";
import SearchIcon from "../../../assets/images/icons/search.png";
import { useLocation, useNavigate } from "react-router-dom";
import Autocomplete from "./autocomplete/Autocomplete";
import { logoutAPI } from "../../../apis/user";
import { toast, ToastContainer } from "react-toastify";

const Header: FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUserMenuOpen(false);
    setKeyword("");
  }, [location]);

  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleUserClick = () => {
    setUserMenuOpen((prev) => !prev);
  };

  const handleMyPage = () => {
    setUserMenuOpen(false);
    navigate("/mypage");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logoutAPI()
      .then((data) => {
        if (data.status === 200) {
          // 로컬 스토리지에서 삭제
          const keys = [
            "accessToken",
            "email",
            "nickname",
            "refreshToken",
            "userId",
            "username",
          ];
          keys.forEach((key) => {
            localStorage.removeItem(key);
          });
          sessionStorage.removeItem("isLoggedIn");
          navigate("/login"); // 로그아웃 성공 시 로그인 페이지로 이동
        } else if (data.status === 400) {
          toast.error("로그아웃 실패!");
        } else {
          toast.error("알 수 없는 오류가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.error("API 호출 실패", error);
        toast.error("로그아웃 요청 중 오류가 발생했습니다.");
      });

    setUserMenuOpen(false);
  };

  return (
    <S.HeaderContainer>
      <S.HeaderWrapper>
        {/* 로고 */}
        <S.HeaderLink to="/" end>
          <S.HeaderImg src={Logo} alt="로고 이미지" />
        </S.HeaderLink>

        <S.HeaderUl>
          <S.HeaderLi>
            <S.HeaderLink to="/" end>
              종목 필터링
            </S.HeaderLink>
          </S.HeaderLi>
          <S.HeaderLi>
            <S.HeaderLink to="/portfolio/my/1">포트폴리오</S.HeaderLink>
          </S.HeaderLi>
          <S.HeaderLi>
            <S.HeaderLink to="/portfolio/share">공유 포트폴리오</S.HeaderLink>
          </S.HeaderLi>
          {/* 검색 */}
          <S.HeaderLi>
            <S.HeaderSearchWrapper>
              <S.HeaderSearch
                placeholder="종목명 또는 종목코드를 입력하세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <S.HeaderSearchIcon src={SearchIcon} />
              <Autocomplete keyword={keyword} />
            </S.HeaderSearchWrapper>
          </S.HeaderLi>
          {/* 유저 */}
          {!isLoggedIn ? (
            <S.HeaderLi onClick={handleLogin}>
              <S.loginSignupButton>Log In / Sign Up</S.loginSignupButton>
            </S.HeaderLi>
          ) : (
            <S.HeaderLi onClick={handleUserClick}>
              <S.HeaderLoginIcon src={PersonIcon} $isOpen={false} />
              <S.HeaderLoginIcon src={ArrowDownIcon} $isOpen={userMenuOpen} />

              {userMenuOpen && (
                <S.UserDropdownMenu>
                  <S.UserDropdownItem onClick={handleMyPage}>
                    마이페이지
                  </S.UserDropdownItem>
                  <S.UserDropdownItem onClick={handleLogout}>
                    로그아웃
                  </S.UserDropdownItem>
                </S.UserDropdownMenu>
              )}
            </S.HeaderLi>
          )}
        </S.HeaderUl>
      </S.HeaderWrapper>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </S.HeaderContainer>
  );
};

export default Header;
