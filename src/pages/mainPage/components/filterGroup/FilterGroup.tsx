import styled from "styled-components";
import Tooltip from "../../../../components/tooltip/tooltip";

type StockIndicatorsType = {
  [key: string]: string;
};

const stockIndicators: StockIndicatorsType = {
  시가총액:
    "해당 기업의 발행주식 수에 현재 주가를 곱해 산출한 회사의 총 가치입니다.",
  매출액: "기업이 상품이나 서비스를 판매해서 얻은 전체 수익 금액입니다.",
  영업이익:
    "기업의 주력 사업 활동에서 발생한 이익으로, 매출액에서 매출원가와 판매·관리비 등을 제외한 금액입니다.",
  당기순이익:
    "모든 비용과 세금을 공제한 후 최종적으로 남은 이익으로, 기업의 실제 ‘순이익’을 의미합니다.",
  ROE: "자기자본 대비 얼마나 효율적으로 이익을 창출했는지를 나타내는 지표입니다.",
  EPS: "기업이 발행한 보통주 한 주당 얼마의 이익을 거둬들였는지를 보여줍니다.",
  PER: "주가를 주당순이익(EPS)으로 나눈 값으로, 주가가 이익 대비 어느 수준인지 평가할 수 있는 지표입니다.",
  BPS: "기업의 순자산(자산 - 부채)을 발행주식 수로 나눈 값으로, 1주당 자산가치가 얼마인지를 나타냅니다.",
  "매출액 증가율":
    "전년 대비 매출액이 얼마나 늘어나거나 줄었는지를 백분율로 보여주는 지표입니다.",
  "순이익 증가율":
    "전년 대비 순이익이 얼마나 증가하거나 감소했는지를 백분율로 나타냅니다.",
  유동비율:
    "유동자산을 유동부채로 나눈 값으로, 기업의 단기 지급 능력을 평가합니다.",
  부채비율:
    "부채 총액을 자기자본으로 나눈 비율로, 기업이 어느 정도 레버리지를 활용하고 있는지 보여주는 지표입니다.",
  주당매출액:
    "전체 매출액을 발행주식 수로 나눈 값으로, 1주당 창출되는 매출 규모를 의미합니다.",
  배당수익률:
    "주당배당금을 주가로 나눈 값으로, 투자 금액 대비 배당으로 얻을 수 있는 수익의 비율입니다.",
  "외국인 보유율":
    "전체 주식 중 외국인이 보유하고 있는 비중으로, 해외 투자자들의 관심과 참여도를 가늠할 수 있는 지표입니다.",
  PBR: "주가를 주당순자산가치(BPS)로 나눈 값으로, 기업의 자산 대비 주가 수준을 평가하는 데 활용됩니다.",
  "영업이익 증가율":
    "전년 대비 영업이익이 얼마나 늘었거나 줄었는지를 백분율로 보여주는 지표입니다.",
};

export const MainPageFilterItem = styled.div<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 104px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 8px;
  background: ${({ $isSelected }) => ($isSelected ? "#2595e0" : "#373D47")};
  color: #fff;
  font-size: 14px;
  font-weight: ${({ $isSelected }) => ($isSelected ? "700" : "400")};
  box-sizing: border-box;
  padding: 0 8px;
  cursor: pointer;
`;

export const InfoIcon = styled.span`
  margin-left: 6px; /* 텍스트와 아이콘 사이 간격 */
  font-size: 12px;
  cursor: pointer; /* 마우스 커서 변경 */
  user-select: none; /* 드래그 방지 */
  color: #fff; /* 아이콘 색상 (배경과 구분) */
`;

interface FilterGroupBase {
  options: string[];
  maxSelection?: number;
}

// 단일 선택과 다중 선택 구분
interface FilterGroupPropsSingle extends FilterGroupBase {
  selected: string;
  multiple?: false;
  onChange: (value: string) => void;
}

interface FilterGroupPropsMultiple extends FilterGroupBase {
  selected: string[];
  multiple: true;
  onChange: (value: string[]) => void;
}

interface TooltipControlProps {
  showTooltip?: boolean;
}

type FilterGroupProps = (FilterGroupPropsSingle | FilterGroupPropsMultiple) &
  TooltipControlProps;

const FilterGroup: React.FC<FilterGroupProps> = ({
  options,
  selected,
  multiple = false,
  onChange,
  maxSelection,
  showTooltip = false,
}) => {
  const handleClick = (option: string) => {
    if (multiple) {
      const selectedArray = selected as string[];
      if (selectedArray.includes(option)) {
        // 이미 선택된 경우 -> 제거
        (onChange as (value: string[]) => void)(
          selectedArray.filter((v) => v !== option)
        );
      } else {
        // 아직 선택되지 않은 경우
        if (
          maxSelection !== undefined &&
          selectedArray.length >= maxSelection
        ) {
          return;
        }
        (onChange as (value: string[]) => void)([...selectedArray, option]);
      }
    } else {
      (onChange as (value: string) => void)(option);
    }
  };

  return (
    <>
      {options.map((option) => (
        <MainPageFilterItem
          key={option}
          $isSelected={
            multiple
              ? (selected as string[]).includes(option)
              : selected === option
          }
          onClick={() => handleClick(option)}
        >
          {option}

          {/* 툴팁 아이콘 */}
          {showTooltip && (
            <Tooltip title={option} body={stockIndicators[option]}>
              <InfoIcon>ⓘ</InfoIcon>
            </Tooltip>
          )}
        </MainPageFilterItem>
      ))}
    </>
  );
};

export default FilterGroup;
