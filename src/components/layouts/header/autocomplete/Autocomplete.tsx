import { useCallback, useEffect, useRef, useState } from "react";
import * as S from "./Autocomplete.styled";
import { autocompleteAPI, AutocompleteStock } from "../../../../apis/stock";
import SamsungImg from "../../../../assets/images/samsung.png";
import { useNavigate } from "react-router-dom";

interface AutocompleteProps {
  keyword: string;
}

const Autocomplete = ({ keyword }: AutocompleteProps) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<AutocompleteStock[]>([]);

  const fetchData = useCallback(() => {
    if (keyword.trim().length === 0) {
      setData([]);
      return;
    }

    autocompleteAPI(keyword)
      .then((data) => {
        setData(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("API 호출 실패", error);
      });
  }, [keyword]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // AutocompleteContainer 바깥 클릭 시 목록 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setData([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // data가 비어있으면 아무것도 렌더링하지 않음
  if (data.length === 0) return null;

  const onClickStock = (id: number) => {
    setData([]);
    navigate(`/stock/${id}`);
  };

  return (
    <S.AutocompleteContainer ref={containerRef}>
      {data.map((stock) => (
        <S.AutocompleteItem
          key={stock.id}
          onClick={() => {
            onClickStock(stock.id);
          }}
        >
          <S.AutocompleteImg src={SamsungImg} />
          <S.AutocompleteWrapper>
            <S.AutocompleteName>{stock.companyName}</S.AutocompleteName>
            <S.AutocompleteTicker>{stock.ticker}</S.AutocompleteTicker>
          </S.AutocompleteWrapper>
        </S.AutocompleteItem>
      ))}
    </S.AutocompleteContainer>
  );
};

export default Autocomplete;
