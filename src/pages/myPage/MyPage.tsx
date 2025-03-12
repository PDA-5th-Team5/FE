import { useState, useEffect } from "react";
import * as S from "./MyPage.styled";
import Button from "../../components/button/Button";
import StockGrid from "../../components/stock/grid/StockGrid";
import Tabs, { TabItem } from "../../components/tab/Tabs";
import { useNavigate } from "react-router-dom";
import { FilterStock } from "../../types/stockTypes";
import {
  getTelegramIDAPI,
  postTelegramIDAPI,
  updateProfileAPI,
} from "../../apis/user";
import { toast, ToastContainer } from "react-toastify";
import { Comment } from "../../apis/user";
import { commentsAPI, stocksAPI } from "../../apis/user";
import Toggle from "./components/Toggle";
import TelegramGuide from "./components/TelegramGuide";
import {
  getTelegramAlertsAPI,
  myPortfolioListAPI,
  TelegramAlerts,
} from "../../apis/portfolio";
import { MyPortfolioResponse } from "../../types/portfolioTypes";

const MyPage = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [stocks, setStocks] = useState<FilterStock[]>([]);
  const [stocksCnt, setStocksCnt] = useState(0);
  const navigate = useNavigate();
  const [telegramID, setTelegramID] = useState("");
  const [myPortfolioList, setMyPortfolioList] = useState<MyPortfolioResponse>();
  const [telegramAlerts, setTelegramAlerts] = useState<TelegramAlerts[]>([]);

  // 텔레그램 탭
  const [activeTelegramTab, setActiveTelegramTab] = useState("list");
  const telegramTabItems: TabItem[] = [
    { label: `알림 목록 (${myPortfolioList?.myPortfoliosCnt})`, value: "list" },
    { label: "ID 등록", value: "regist" },
  ];
  const handleTelegramTabClick = (value: string) => {
    setActiveTelegramTab(value);
  };

  useEffect(() => {
    stocksAPI()
      .then((data) => {
        if (data.status === 200) {
          setStocks(data.data.stockInfos);
          setStocksCnt(data.data.stockCnt);
        } else if (data.status === 400) {
          toast.error("나의 종목 불러오기 실패!");
        } else {
          toast.error("알 수 없는 오류가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.error("API 호출 실패", error);
        toast.error("나의 종목 불러오기 요청 중 오류가 발생했습니다.");
      });

    getTelegramID();
    getMyPortfolio();
    getTelegramAlerts();
  }, []);

  // 댓글 상태: 초기엔 빈 배열로 설정
  const [stockComments, setStockComments] = useState<Comment[]>([]);
  const [portfolioComments, setPortfolioComments] = useState<Comment[]>([]);

  const [activeTab, setActiveTab] = useState<
    "profile" | "stocks" | "comments" | "telegram"
  >("profile");

  // MyCommentsAPI 호출: 컴포넌트 마운트 시 댓글 데이터 가져오기
  useEffect(() => {
    commentsAPI()
      .then((data) => {
        if (data.status === 200) {
          setStockComments(data.data.commentsS);
          setPortfolioComments(data.data.commentsP);
        } else {
          toast.error("댓글 데이터를 불러오지 못했습니다.");
        }
      })
      .catch((error) => {
        console.error("댓글 API 호출 에러", error);
        toast.error("댓글 데이터를 불러오지 못했습니다.");
      });
  }, []);

  const handleTabClick = (
    tab: "profile" | "stocks" | "comments" | "telegram"
  ) => {
    setActiveTab(tab);
  };

  const profileEdit = () => {
    updateProfileAPI(nickname, email)
      .then((data) => {
        if (data.status === 200) {
          toast.success("프로필 수정 성공!");
          localStorage.setItem("nickname", nickname);
          localStorage.setItem("email", email);
          setTimeout(() => {
            window.location.reload();
            // 또는 react-router-dom 사용 시: navigate(0);
          }, 1500);
        } else if (data.status === 400) {
          toast.error("프로필 수정 실패! 다시 확인해 주세요.");
        } else {
          toast.error("알 수 없는 오류가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.error("API 호출 실패", error);
        toast.error("API 호출 실패.");
      });
  };

  // 나의 댓글 탭
  const [activeCommentTab, setActiveCommentTab] = useState("stock");
  const tabItems: TabItem[] = [
    { label: `종목(${stockComments.length})`, value: "stock" },
    { label: `포트폴리오(${portfolioComments.length})`, value: "portfolio" },
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
    activeCommentTab === "stock" ? stockComments : portfolioComments;

  // 북마크 토글 상태 업데이트 함수
  const handleToggleBookmark = (stockId: number, newState: boolean) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.stockId === stockId ? { ...stock, isBookmark: newState } : stock
      )
    );
  };

  const addTelegramID = (telegramID: string) => {
    postTelegramIDAPI(telegramID)
      .then((data) => {
        if (data.status === 201) {
          toast.success("텔레그램 Chat ID!");
        } else if (data.status === 400) {
          toast.error("유효한 ID가 아닙니다.");
        } else {
          toast.error("알 수 없는 오류가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.error("API 호출 실패", error);
        toast.error("유효한 ID가 아닙니다.");
      });
  };

  const getTelegramID = () => {
    getTelegramIDAPI()
      .then((data) => {
        if (data.status === 200) {
          setTelegramID(data.data);
        } else if (data.status === 400) {
          console.error("ID 조회에 실패하였습니다.");
        } else {
          console.error("알 수 없는 오류가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.error("API 호출 실패", error);
      });
  };

  const getMyPortfolio = () => {
    myPortfolioListAPI()
      .then((data) => {
        setMyPortfolioList(data);
      })
      .catch((error) => {
        console.error("API 호출 실패", error);
      });
  };

  const getTelegramAlerts = () => {
    getTelegramAlertsAPI()
      .then((data) => {
        if (data.status === 200) {
          setTelegramAlerts(data.data);
        } else if (data.status === 400) {
          console.error("내 포트폴리오 알림 조회에 실패하였습니다.");
        } else {
          console.error("알 수 없는 오류가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.error("API 호출 실패", error);
      });
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

        <S.MyPageSidebarItem
          $active={activeTab === "telegram"}
          onClick={() => handleTabClick("telegram")}
        >
          텔레그램 알림
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
                <S.SectionProfileInput
                  placeholder={localStorage.getItem("nickname") || "이유진"}
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </S.SectionProfileItem>

              <S.SectionProfileItem>
                <S.SectionProfileTitle>이메일</S.SectionProfileTitle>
                <S.SectionProfileInput
                  placeholder={localStorage.getItem("email") || "abc@naver.com"}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <S.SectionCnt>{stocksCnt}</S.SectionCnt>
            </S.SectionTitleWrapper>
            <S.SectionGrid>
              <StockGrid
                stocks={stocks}
                setStocks={setStocks}
                onToggleBookmark={handleToggleBookmark}
              />
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

        {activeTab === "telegram" && (
          <>
            <S.SectionTitle>텔레그램 알림</S.SectionTitle>
            <S.SectionComment>
              <Tabs
                items={telegramTabItems}
                activeValue={activeTelegramTab}
                onChange={handleTelegramTabClick}
              />
              {activeTelegramTab === "list" ? (
                <S.CommentList>
                  {myPortfolioList?.myPortfolios.map((portfolio) => {
                    const matchingAlert = telegramAlerts.find(
                      (alert) => alert.portfolioId === portfolio.myPortfolioId
                    );

                    return (
                      <S.TelegramItem>
                        <S.TelegramTitle>
                          {portfolio.myPortfolioTitle}
                        </S.TelegramTitle>
                        <S.TelegramToggleWrapper>
                          <S.TelegramToggleText>
                            텔레그램으로 알림 받기
                          </S.TelegramToggleText>
                          <S.TelegramToggle>
                            <Toggle
                              checked={!!matchingAlert}
                              portfolioId={portfolio.myPortfolioId}
                              alertId={matchingAlert?.alertId}
                              getTelegramAlerts={getTelegramAlerts}
                              telegramID={telegramID}
                            />
                          </S.TelegramToggle>
                        </S.TelegramToggleWrapper>
                      </S.TelegramItem>
                    );
                  })}
                </S.CommentList>
              ) : (
                <>
                  <S.CommentList>
                    <S.SectionProfileItem>
                      <S.SectionProfileTitle>
                        텔레그램 Chat ID
                      </S.SectionProfileTitle>
                      <S.SectionProfileInputWrapper>
                        <S.SectionProfileInput
                          placeholder={"ID 10자를 입력해주세요"}
                          type="text"
                          value={telegramID}
                          onChange={(e) => setTelegramID(e.target.value)}
                        />
                        <Button
                          text="등록"
                          onClick={() => {
                            addTelegramID(telegramID);
                          }}
                        />
                      </S.SectionProfileInputWrapper>
                    </S.SectionProfileItem>
                    <TelegramGuide />
                  </S.CommentList>
                </>
              )}
            </S.SectionComment>
          </>
        )}
      </S.MyPageContent>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </S.MyPageContainer>
  );
};

export default MyPage;
