import BookmarkIconOn from "../../assets/images/icons/bookmark_on.png";
import BookmarkIconOff from "../../assets/images/icons/bookmark_off.png";
import styled from "styled-components";
import { addToWatchlist, removeFromWatchlist } from "../../apis/stock";
import { useState, useEffect } from "react";

interface BookmarkProps {
  stockId: number;
  isBookmarked: boolean;
  isMyWatchlist?: boolean;
}

const StyledBookmark = styled.div`
  width: 40px;
  height: 40px;
  background-color: #21272f;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const BookmarkIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Bookmark = ({ stockId, isBookmarked, isMyWatchlist }: BookmarkProps) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [subBookmarked, setsubBookmarked] = useState(isMyWatchlist);

  // 부모에서 전달된 isBookmarked가 변경되면 로컬 상태도 업데이트
  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  useEffect(() => {
    setBookmarked(isMyWatchlist ?? isBookmarked);
  }, []);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (sessionStorage.getItem("isLoggedIn") === "true") {
      setsubBookmarked(false);
      const newState = !bookmarked;

      if (isMyWatchlist && bookmarked) {
        const confirmed = window.confirm("정말 삭제하시겠습니까?");
        if (confirmed) {
          try {
            const response = newState
              ? await addToWatchlist(stockId)
              : await removeFromWatchlist(stockId);
            if (response.status === 200) {
              setBookmarked(newState);
              window.location.reload();
            } else {
              console.error(
                `관심종목 ${newState ? "추가" : "삭제"} 실패:`,
                response.message
              );
            }
          } catch (error) {
            console.error("API 호출 오류:", error);
          }
        } else {
          return; // 취소한 경우 API 호출 로직 실행하지 않음
        }
      } else {
        try {
          const response = newState
            ? await addToWatchlist(stockId)
            : await removeFromWatchlist(stockId);
          if (response.status === 200) {
            setBookmarked(newState);
          } else {
            console.error(
              `관심종목 ${newState ? "추가" : "삭제"} 실패:`,
              response.message
            );
          }
        } catch (error) {
          console.error("API 호출 오류:", error);
        }
      }
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <StyledBookmark onClick={handleClick}>
      <BookmarkIcon
        src={bookmarked || subBookmarked ? BookmarkIconOn : BookmarkIconOff}
      />
    </StyledBookmark>
  );
};

export default Bookmark;
