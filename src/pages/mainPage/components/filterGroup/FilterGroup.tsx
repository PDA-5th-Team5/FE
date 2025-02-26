import styled from "styled-components";

const MainPageFilterItem = styled.div<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 104px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 8px;
  background: ${({ $isSelected }) => ($isSelected ? "#2595e0" : "#373D47")};
  color: #fff;
  font-size: 14px;
  font-weight: ${({ $isSelected }) => ($isSelected ? "700" : "400")};
  cursor: pointer;
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

type FilterGroupProps = FilterGroupPropsSingle | FilterGroupPropsMultiple;

const FilterGroup: React.FC<FilterGroupProps> = ({
  options,
  selected,
  multiple = false,
  onChange,
  maxSelection,
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
        </MainPageFilterItem>
      ))}
    </>
  );
};

export default FilterGroup;
