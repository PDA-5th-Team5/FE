import { FC, useEffect, useState } from "react";
import * as S from "./Header.styled";
import Logo from "../../../assets/images/logo.png";
import ArrowDownIcon from "../../../assets/images/icons/arrowDown.png";
import PersonIcon from "../../../assets/images/icons/person.png";
import SearchIcon from "../../../assets/images/icons/search.png";
import { useLocation, useNavigate } from "react-router-dom";

const Header: FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUserMenuOpen(false);
  }, [location]);

  const handleUserClick = () => {
    setUserMenuOpen((prev) => !prev);
  };

  const handleMyPage = () => {
    setUserMenuOpen(false);
    navigate("/mypage");
  };

  const handleLogout = () => {
    // TODO: 로그아웃 로직
    alert("로그아웃 클릭");
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
              <S.HeaderSearch placeholder="종목명 또는 종목코드를 입력하세요" />
              <S.HeaderSearchIcon src={SearchIcon} />
            </S.HeaderSearchWrapper>
          </S.HeaderLi>
          {/* 유저 */}
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
        </S.HeaderUl>
      </S.HeaderWrapper>
    </S.HeaderContainer>
  );
};

export default Header;
