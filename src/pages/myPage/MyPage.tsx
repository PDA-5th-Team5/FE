import { useState } from "react";
import * as S from "./MyPage.styled";
import Button from "../../components/button/Button";
import StockGrid from "../../components/stock/grid/StockGrid";
import { Stock } from "../../components/stock/list/StockList";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "stocks" | "comments">(
    "profile"
  );

  const handleTabClick = (tab: "profile" | "stocks" | "comments") => {
    setActiveTab(tab);
  };

  const profileEdit = () => {
    //TODO 프로필 수정 API
    alert("프로필 변경");
  };

  const [stocks, setStocks] = useState<Stock[]>([
    {
      id: 1,
      ticker: "A0001",
      name: "삼성전자",
      price: 58900.0,
      change7d: 5.2,
      change1y: -9.8,
      marketCap: 4500,
      per: 15.22,
      debtRatio: 33.49,
      sector: "반도체",
      bookmark: false,
      description:
        "삼성전자는 세계적인 전자제품 제조업체로, 다양한 소비자 가전 및 반도체 제품을 생산합니다.",
    },
    {
      id: 2,
      ticker: "A0002",
      name: "하이닉스",
      price: 105000.0,
      change7d: 3.1,
      change1y: 4.2,
      marketCap: 9000,
      per: 17.56,
      debtRatio: 33.49,
      sector: "반도체",
      bookmark: false,
      description: "하이닉스는 메모리 반도체 분야의 선도 기업입니다.",
    },
    {
      id: 3,
      ticker: "A0003",
      name: "LG전자",
      price: 1234,
      change7d: 2.5,
      change1y: -7.8,
      marketCap: 3000,
      per: 13.34,
      debtRatio: 28.19,
      sector: "가전",
      bookmark: true,
      description:
        "LG전자는 가전제품과 디스플레이 분야에서 혁신적인 제품을 제공합니다.",
    },
    {
      id: 4,
      ticker: "A0003",
      name: "LG전자",
      price: 1234,
      change7d: 2.5,
      change1y: -7.8,
      marketCap: 3000,
      per: 13.34,
      debtRatio: 28.19,
      sector: "가전",
      bookmark: true,
      description:
        "LG전자는 가전제품과 디스플레이 분야에서 혁신적인 제품을 제공합니다.",
    },
  ]);

  const onToggleBookmark = (id: number) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.id === id ? { ...stock, bookmark: !stock.bookmark } : stock
      )
    );
  };

  return (
    <S.MyPageContainer>
      {/* 왼쪽 사이드바 */}
      <S.MyPageSidebar>
        <S.MyPageSidebarItem
          $active={activeTab === "profile"}
          onClick={() => handleTabClick("profile")}
        >
          프로필
        </S.MyPageSidebarItem>

        <S.MyPageSidebarItem
          $active={activeTab === "stocks"}
          onClick={() => handleTabClick("stocks")}
        >
          관심 종목
        </S.MyPageSidebarItem>

        <S.MyPageSidebarItem
          $active={activeTab === "comments"}
          onClick={() => handleTabClick("comments")}
        >
          나의 댓글
        </S.MyPageSidebarItem>
      </S.MyPageSidebar>

      {/* 오른쪽 내용 */}
      <S.MyPageContent>
        {activeTab === "profile" && (
          <>
            <S.SectionTitle>프로필</S.SectionTitle>
            <S.SectionProfile>
              <S.SectionProfileItem>
                <S.SectionProfileTitle>닉네임</S.SectionProfileTitle>
                <S.SectionProfileInput placeholder="이유진" type="text" />
              </S.SectionProfileItem>

              <S.SectionProfileItem>
                <S.SectionProfileTitle>닉네임</S.SectionProfileTitle>
                <S.SectionProfileInput
                  placeholder="abc@naver.com"
                  type="email"
                />
              </S.SectionProfileItem>
              <S.ButtonWrapper>
                <Button text="업데이트" onClick={profileEdit} />
              </S.ButtonWrapper>
            </S.SectionProfile>
          </>
        )}

        {activeTab === "stocks" && (
          <>
            <S.SectionTitleWrapper>
              <S.SectionTitle>관심 종목</S.SectionTitle>
              <S.SectionCnt>12개</S.SectionCnt>
            </S.SectionTitleWrapper>
            <S.SectionGrid>
              <StockGrid stocks={stocks} onToggle={onToggleBookmark} />
            </S.SectionGrid>
          </>
        )}

        {activeTab === "comments" && (
          <>
            <S.SectionTitle>나의 댓글</S.SectionTitle>
          </>
        )}
      </S.MyPageContent>
    </S.MyPageContainer>
  );
};

export default MyPage;
