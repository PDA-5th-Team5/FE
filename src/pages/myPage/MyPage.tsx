import { useState } from "react";
import * as S from "./MyPage.styled";
import Button from "../../components/button/Button";
import StockGrid from "../../components/stock/grid/StockGrid";
import Tabs, { TabItem } from "../../components/tab/Tabs";
import { useNavigate } from "react-router-dom";
import { Stock } from "../../types/stockTypes";

const MyPage = () => {
  const navigate = useNavigate();
  // 댓글 더미데이터
  const portfolioComments = {
    category: "portfolio",
    commentsCnt: 8,
    comments: [
      {
        connectId: 1,
        name: "내 포트폴리오얌",
        ticker: "005930",
        commentId: 1,
        content: "댓글내용",
        date: "2024.02.18",
      },
      {
        connectId: 2,
        name: "포트폴리오명은 이거얌",
        ticker: "005930",
        commentId: 2,
        content: "댓글내용2",
        date: "2024.02.18",
      },
    ],
  };

  const stockComments = {
    category: "stock",
    commentsCnt: 12,
    comments: [
      {
        connectId: 1,
        name: "삼성전자",
        ticker: "005930",
        commentId: 1,
        content: "댓글내용",
        date: "2024.02.18",
      },
      {
        connectId: 2,
        name: "LG전자",
        ticker: "005930",
        commentId: 2,
        content: "댓글내용2",
        date: "2024.02.18",
      },
    ],
  };

  //더미데이터
  const dummyStockResponse = {
    status: 201,
    message: "성공입니다.",
    data: {
      stockCnt: 4,
      stockInfos: [
        {
          snowflakeS: {
            elements: {
              bsopPrti: 19,
              thtrNtin: 19,
              roeVal: 16,
              cptlNtinRate: 7,
              eps: 6,
              per: 18,
            },
          },
          stockId: 1,
          ticker: "05252",
          companyName: "삼성전자",
          currentPrice: 50000,
          "1DayFluctuationRate": 0.2,
          "1WeekFluctuationRate": 7.3,
          "1YearFluctuationRate": 13.1,
          marketCap: 4500,
          per: 13.56,
          debtRate: 30.49,
          sector: "반도체",
          isBookmark: false,
          description:
            "삼성전자는 세계적인 전자제품 제조업체로, 다양한 소비자 가전 및 반도체 제품을 생산합니다.",
        },
        {
          snowflakeS: {
            elements: {
              bsopPrti: 19,
              thtrNtin: 3,
              roeVal: 16,
            },
          },
          stockId: 2,
          ticker: "013660",
          companyName: "하이닉스",
          currentPrice: 50000,
          "1DayFluctuationRate": 0.4,
          "1WeekFluctuationRate": 5.1,
          "1YearFluctuationRate": 10.0,
          marketCap: 9000,
          per: 17.56,
          debtRate: 33.49,
          sector: "반도체",
          isBookmark: false, // 추가
          description: "하이닉스는 메모리 반도체 분야의 선도 기업입니다.", // 추가
        },
        {
          snowflakeS: {
            elements: {
              thtrNtin: 3, // 당기순이익
              roeVal: 10, // ROE
            },
          },
          stockId: 3,
          ticker: "013660",
          companyName: "하이닉스",
          currentPrice: 50000,
          "1DayFluctuationRate": 0.4,
          "1WeekFluctuationRate": 5.1,
          "1YearFluctuationRate": 10.0,
          marketCap: 9000,
          per: 17.56,
          debtRate: 33.49,
          sector: "반도체",
          isBookmark: false, // 추가
          description: "하이닉스는 메모리 반도체 분야의 선도 기업입니다.", // 추가
        },
        // ...추가 주식 데이터
      ],
    },
  };

  const [stocks, setStocks] = useState<Stock[]>(
    dummyStockResponse.data.stockInfos
  );

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

  // 나의 댓글 탭
  const [activeCommentTab, setActiveCommentTab] = useState("stock");
  const tabItems: TabItem[] = [
    { label: `종목(${stockComments.commentsCnt})`, value: "stock" },
    {
      label: `포트폴리오(${portfolioComments.commentsCnt})`,
      value: "portfolio",
    },
  ];

  const handleCommentTabClick = (value: string) => {
    setActiveCommentTab(value);
  };

  const handleCommentClick = (id: number) => {
    if (activeCommentTab === "stock") {
      navigate(`/stock/${id}`);
    } else {
      navigate(`/portfolio/share/${id}`);
    }
  };

  const currentComments =
    activeCommentTab === "stock"
      ? stockComments.comments
      : portfolioComments.comments;

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
                <S.SectionProfileTitle>이메일</S.SectionProfileTitle>
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
              <StockGrid stocks={stocks} setStocks={setStocks} />
            </S.SectionGrid>
          </>
        )}

        {activeTab === "comments" && (
          <>
            <S.SectionTitle>나의 댓글</S.SectionTitle>
            <S.SectionComment>
              <Tabs
                items={tabItems}
                activeValue={activeCommentTab}
                onChange={handleCommentTabClick}
              />

              <S.CommentList>
                {currentComments.map((comment) => (
                  <S.CommentItem
                    key={comment.commentId}
                    onClick={() => handleCommentClick(comment.connectId)}
                  >
                    <S.CommentHeader>
                      <S.CommentTitle>{comment.name}</S.CommentTitle>
                      <S.CommentDate>{comment.date}</S.CommentDate>
                    </S.CommentHeader>
                    <S.CommentContent>{comment.content}</S.CommentContent>
                  </S.CommentItem>
                ))}
              </S.CommentList>
            </S.SectionComment>
          </>
        )}
      </S.MyPageContent>
    </S.MyPageContainer>
  );
};

export default MyPage;
