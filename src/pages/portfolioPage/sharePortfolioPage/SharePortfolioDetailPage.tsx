import Comment from "../../../components/comment/Comment";
import PageHeader from "../../../components/pageHeader/PageHeader";
// import { CommentsData } from "../../../types/commentTypes";
import PortfolioPage from "../PortfolioPage";
import * as S from "./SharePortfolioDetailPage.styled";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getSharePortfolioDetailAPI,
  getPortfolioCommentsAPI,
  deletePortfolioCommentAPI,
  editPortfolioCommentAPI,
  saveSharePortfolioAPI,
  PortfolioDetailResponse,
} from "../../../apis/portfolio";
import { transformElementsToItems } from "../../../utils/snowflakeUtils";
import { CommentsResponse } from "../../../apis/stock";
const SharePortfolioDetailPage = () => {
  const { num } = useParams<{ num: string }>();
  const sharePortfolioId = num ? parseInt(num, 10) : 1;

  const [portfolio, setPortfolio] = useState<PortfolioDetailResponse | null>(
    null
  );
  const [elementsObj, setElementsObj] = useState<{ [key: string]: number[] }>(
    {}
  );
  const [snowflakeItems, setSnowflakeItems] = useState<any[]>([]);
  // const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(true);
  const pageName: "main" | "my" | "share" = "share";
  // const [isLoading, setIsLoading] = useState(true);
  // const [page, setPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  // const size = 10;
  const [error, setError] = useState<string | null>(null);
  const [commentsData, setCommentsData] = useState<CommentsResponse>({
    comments: [],
  });
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  //1. 댓글 조회
  useEffect(() => {
    fetchComments();
  }, [sharePortfolioId]);

  const fetchComments = async () => {
    try {
      // setIsLoading(true);
      const data = await getPortfolioCommentsAPI(sharePortfolioId);
      const result: CommentsResponse = data ?? { comments: [], commentsCnt: 0 };
      setCommentsData(result);
      return result;
    } catch (error) {
      console.error("댓글 로딩 실패:", error);
      return { comments: [], commentsCnt: 0 };
    } finally {
      // setIsLoading(false);
    }
  };

  //2. 댓글 삭제
  const handleDelete = async (commentId: number) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        await deletePortfolioCommentAPI(sharePortfolioId, commentId);
        alert("댓글이 삭제되었습니다.");
        fetchComments();
      } catch (error) {
        console.error("댓글 삭제 실패:", error);
        alert("댓글 삭제에 실패했습니다.");
      }
      setOpenDropdownId(null);
    }
  };

  //3. 댓글 수정
  const handleEdit = (commentId: number, currentContent: string) => {
    console.log("adddd");

    setEditingCommentId(commentId);
    setEditContent(currentContent);
    setOpenDropdownId(null);
  };

  const handleCancelEdit = () => {
    console.log("수정");

    setEditingCommentId(null);
    setEditContent("");
  };
  const handleSaveEdit = async (commentId: number) => {
    console.log("ad");

    if (!editContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await editPortfolioCommentAPI(sharePortfolioId, commentId, editContent);
      alert("댓글이 수정되었습니다.");
      setEditingCommentId(null);
      setEditContent("");

      setOpenDropdownId(null);
      await fetchComments(); // 댓글 목록 새로고침
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };
  useEffect(() => {
    if (editingCommentId === null) {
      setOpenDropdownId(null); // 수정 완료 후 드롭다운 닫기
    }
  }, [editingCommentId]);
  useEffect(() => {
    const fetchPortfolioDetail = async () => {
      try {
        setLoading(true);
        const portfolioId = parseInt(num || "0", 10);

        if (!portfolioId) {
          throw new Error("유효하지 않은 포트폴리오 ID");
        }

        const response = await getSharePortfolioDetailAPI(portfolioId);

        setPortfolio(response);

        // 재무 지표 데이터 추출
        const tempElements: { [key: string]: number[] } = {};

        // 모든 가능한 재무 지표 확인
        if (response.marketCap) {
          tempElements.marketCap = [
            Number(response.marketCap.min),
            Number(response.marketCap.max),
          ];
        }
        if (response.per) {
          tempElements.per = [
            Number(response.per.min),
            Number(response.per.max),
          ];
        }
        if (response.eps) {
          tempElements.eps = [
            Number(response.eps.min),
            Number(response.eps.max),
          ];
        }
        if (response.bps) {
          tempElements.bps = [
            Number(response.bps.min),
            Number(response.bps.max),
          ];
        }
        if (response.pbr) {
          tempElements.pbr = [
            Number(response.pbr.min),
            Number(response.pbr.max),
          ];
        }
        if (response.dividendYield) {
          tempElements.dividendYield = [
            Number(response.dividendYield.min),
            Number(response.dividendYield.max),
          ];
        }
        if (response.foreignerRatio) {
          tempElements.foreignerRatio = [
            Number(response.foreignerRatio.min),
            Number(response.foreignerRatio.max),
          ];
        }
        if (response.sps) {
          tempElements.sps = [
            Number(response.sps.min),
            Number(response.sps.max),
          ];
        }
        if (response.saleAccount) {
          tempElements.saleAccount = [
            Number(response.saleAccount.min),
            Number(response.saleAccount.max),
          ];
        }
        if (response.crntRate) {
          tempElements.crntRate = [
            Number(response.crntRate.min),
            Number(response.crntRate.max),
          ];
        }
        if (response.lbltRate) {
          tempElements.lbltRate = [
            Number(response.lbltRate.min),
            Number(response.lbltRate.max),
          ];
        }
        if (response.ntinInrt) {
          tempElements.ntinInrt = [
            Number(response.ntinInrt.min),
            Number(response.ntinInrt.max),
          ];
        }
        if (response.bsopPrfiInrt) {
          tempElements.bsopPrfiInrt = [
            Number(response.bsopPrfiInrt.min),
            Number(response.bsopPrfiInrt.max),
          ];
        }
        if (response.grs) {
          tempElements.grs = [
            Number(response.grs.min),
            Number(response.grs.max),
          ];
        }
        if (response.roeVal) {
          tempElements.roeVal = [
            Number(response.roeVal.min),
            Number(response.roeVal.max),
          ];
        }
        if (response.bsopPrti) {
          tempElements.bsopPrti = [
            Number(response.bsopPrti.min),
            Number(response.bsopPrti.max),
          ];
        }
        if (response.thtrNtin) {
          tempElements.thtrNtin = [
            Number(response.thtrNtin.min),
            Number(response.thtrNtin.max),
          ];
        }

        setElementsObj(tempElements);

        // 데이터 존재 여부 확인
        const hasFinancialData = Object.keys(tempElements).length > 0;
        // setHasData(hasFinancialData);

        // 스노우플레이크 아이템 생성
        if (hasFinancialData) {
          const items = transformElementsToItems(tempElements);
          setSnowflakeItems(items);
        }

        setLoading(false);
      } catch (err) {
        console.error("포트폴리오 상세 정보 로딩 실패:", err);
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
        setLoading(false);
      }
    };

    fetchPortfolioDetail();
  }, [num]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  if (!portfolio) {
    return <div>포트폴리오를 찾을 수 없습니다.</div>;
  }
  const onClickSave = async () => {
    try {
      await saveSharePortfolioAPI(sharePortfolioId);
      alert("포트폴리오가 내 목록에 저장되었습니다.");
    } catch (error) {
      console.error("포트폴리오 저장 실패:", error);
      alert("포트폴리오 저장에 실패했습니다.");
    }
  };

  return (
    <S.PortfolioDetailContainer>
      <PageHeader
        title={portfolio.title || "공유 포트폴리오"}
        headerButtons={{
          rightText: "저장",
          onRightClick: onClickSave,
        }}
      />

      <S.PortfolioDetailContent>
        <PortfolioPage
          //  description={portfolio.description}

          portfolioData={portfolio}
          elementsObj={elementsObj}
          snowflakeItems={snowflakeItems}
          isMy={false}
          pageName={pageName}
        />
      </S.PortfolioDetailContent>

      <S.PortfolioDetailComments>
        <Comment
          data={commentsData}
          handleDelete={handleDelete}
          handleSaveEdit={handleSaveEdit}
          handleEdit={handleEdit}
          handleCancelEdit={handleCancelEdit}
          editingCommentId={editingCommentId}
          editContent={editContent}
          setEditContent={setEditContent}
          fetchComments={fetchComments}
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
        />
      </S.PortfolioDetailComments>
    </S.PortfolioDetailContainer>
  );
};

export default SharePortfolioDetailPage;
