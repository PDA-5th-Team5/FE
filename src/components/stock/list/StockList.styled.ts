import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
  color: #fff;

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  thead th {
    color: #8b8d91;
    height: 30px;
    font-size: 12px;
    text-align: left;
  }

  tbody td {
    font-size: 12px;
    text-align: left;
  }

  tbody tr {
    cursor: pointer;
    &:hover {
      background-color: #1a222d;
    }
  }

  tr {
    border-bottom: 1px solid #2d323a;
  }

  th,
  td {
    vertical-align: middle;
    padding: 12px 0;
  }

  th:not(:first-child),
  td:not(:first-child) {
    padding-left: 32px;
  }

  thead th:nth-child(1),
  tbody td:nth-child(1) {
    position: relative;
    width: 50px;
  }

  thead th:nth-child(2),
  tbody td:nth-child(2) {
    width: 140px;
  }
  thead th:nth-child(3),
  tbody td:nth-child(3) {
    width: 140px;
  }
  thead th:nth-child(4),
  tbody td:nth-child(4) {
    width: 80px;
  }
  thead th:nth-child(5),
  tbody td:nth-child(5) {
    width: 80px;
  }
  thead th:nth-child(6),
  tbody td:nth-child(6) {
    width: 80px;
  }
  thead th:nth-child(7),
  tbody td:nth-child(7) {
    width: 80px;
  }
  thead th:nth-child(8),
  tbody td:nth-child(8) {
    width: 80px;
  }
  thead th:nth-child(9),
  tbody td:nth-child(9) {
    width: 120px;
  }
  thead th:nth-child(10),
  tbody td:nth-child(10) {
    width: 40px;
    padding-right: 10px;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  display: none;
`;

export const StockListTicker = styled.div`
  color: #2595e0;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const StockListName = styled.div`
  color: #8b8d91;
  font-size: 12px;
`;

export const ChangeTd = styled.td<{ $isPositive: boolean }>`
  color: ${({ $isPositive }) => ($isPositive ? "#E74142" : "#2D7AFF")};
`;

export const SnowflakeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding-left: 10px;
`;

export const BookmarkWrapper = styled.div``;
