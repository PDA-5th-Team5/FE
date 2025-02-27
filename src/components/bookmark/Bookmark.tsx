import BookmarkIconOn from "../../assets/images/icons/bookmark_on.png";
import BookmarkIconOff from "../../assets/images/icons/bookmark_off.png";
import styled from "styled-components";

interface BookmarkProps {
  isBookmarked: boolean;
  onToggle: () => void;
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

const Bookmark = ({ isBookmarked, onToggle }: BookmarkProps) => {
  return (
    <>
      <StyledBookmark onClick={onToggle}>
        <BookmarkIcon src={isBookmarked ? BookmarkIconOn : BookmarkIconOff} />
      </StyledBookmark>
    </>
  );
};

export default Bookmark;
