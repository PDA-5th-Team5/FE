import { useState } from "react";
import * as S from "./MyPage.styled";
import Button from "../../components/button/Button";

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
          관심목록
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
            <S.SectionTitle>관심목록</S.SectionTitle>
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
