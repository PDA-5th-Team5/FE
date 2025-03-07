import { useEffect, useState } from "react";
import styled from "styled-components";
import { Stock } from "../../../../types/stockTypes";
import { autocompleteAPI } from "../../../../apis/stock";
import SamsungImg from "../../../../assets/images/samsung.png";

const AutocompleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40px;
  width: 100%;
  height: 420px;
  border-radius: 8px;
  border: 1px solid #3c4049;
  background: #1b212d;
  z-index: 999;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #272e3b;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8b8c90;
    border-radius: 4px;
  }
`;

const AutocompleteItem = styled.div`
  display: flex;
  gap: 16px;
  border-bottom: 1px solid #2c313c;
  padding: 12px 28px;
  cursor: pointer;

  &:hover {
    background-color: #2d323f;
  }
`;

const AutocompleteImg = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 8px;
`;

const AutocompleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const AutocompleteName = styled.div`
  color: #fff;
  font-size: 14px;
`;

const AutocompleteTicker = styled.div`
  color: #b8b9ba;
  font-size: 14px;
`;

const Autocomplete = () => {
  const [data, setData] = useState<Stock[]>([
    {
      stockId: 1,
      ticker: "05252",
      companyName: "삼성전자",
    },
    {
      stockId: 2,
      ticker: "05252",
      companyName: "삼성전기",
    },
    {
      stockId: 3,
      ticker: "05252",
      companyName: "삼성물산",
    },
    {
      stockId: 1,
      ticker: "05252",
      companyName: "삼성전자",
    },
    {
      stockId: 2,
      ticker: "05252",
      companyName: "삼성전기",
    },
    {
      stockId: 3,
      ticker: "05252",
      companyName: "삼성물산",
    },
    {
      stockId: 1,
      ticker: "05252",
      companyName: "삼성전자",
    },
    {
      stockId: 2,
      ticker: "05252",
      companyName: "삼성전기",
    },
    {
      stockId: 3,
      ticker: "05252",
      companyName: "삼성물산",
    },
    {
      stockId: 1,
      ticker: "05252",
      companyName: "삼성전자",
    },
    {
      stockId: 2,
      ticker: "05252",
      companyName: "삼성전기",
    },
    {
      stockId: 3,
      ticker: "05252",
      companyName: "삼성물산",
    },
  ]);

  //   useEffect(() => {
  //     autocompleteAPI()
  //       .then((data) => {
  //         setData(data);
  //       })
  //       .catch((error) => {
  //         console.error("API 호출 실패", error);
  //       });
  //   }, []);

  return (
    <AutocompleteContainer>
      {data.map((stock) => (
        <AutocompleteItem key={stock.stockId}>
          <AutocompleteImg src={SamsungImg} />
          <AutocompleteWrapper>
            <AutocompleteName>{stock.companyName}</AutocompleteName>
            <AutocompleteTicker>{stock.ticker}</AutocompleteTicker>
          </AutocompleteWrapper>
        </AutocompleteItem>
      ))}
    </AutocompleteContainer>
  );
};

export default Autocomplete;
