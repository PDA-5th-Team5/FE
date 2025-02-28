import { FC } from "react";
import * as S from "./Header.styled";
import Logo from "../../../assets/images/logo.png";
import ArrowDownIcon from "../../../assets/images/icons/arrowDown.png";
import PersonIcon from "../../../assets/images/icons/person.png";
import SearchIcon from "../../../assets/images/icons/search.png";

const Header: FC = () => {
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
          <S.HeaderLi>
            <S.HeaderLoginIcon src={PersonIcon} />
            <S.HeaderLoginIcon src={ArrowDownIcon} />
          </S.HeaderLi>
        </S.HeaderUl>
      </S.HeaderWrapper>
    </S.HeaderContainer>
  );
};

export default Header;
