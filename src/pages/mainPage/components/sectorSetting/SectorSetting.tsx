import { groupByInitialConsonant, CHO } from "../../../../utils/hangulUtils.ts";
import FilterGroup from "../filterGroup/FilterGroup";
import styled from "styled-components";

const ChoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ChoTitle = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

const ChoGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 28px;
  flex-wrap: wrap;
`;

interface SectorSettingProps {
  allSectors: string[];
  selectedKeys: string[];
  onChange: (newSelected: string[]) => void;
}

const SectorSetting: React.FC<SectorSettingProps> = ({
  allSectors,
  selectedKeys,
  onChange,
}) => {
  // 1) 초성별로 그룹화
  const grouped = groupByInitialConsonant(allSectors);

  // 2) 초성 순으로 정렬
  const sortedInitials = Object.keys(grouped).sort(
    (a, b) => CHO.indexOf(a) - CHO.indexOf(b)
  );

  return sortedInitials.map((initial) => (
    <ChoWrapper key={initial}>
      <ChoTitle>{initial}</ChoTitle>
      <ChoGroup>
        <FilterGroup
          options={grouped[initial]}
          selected={selectedKeys}
          multiple={true}
          onChange={onChange}
        />
      </ChoGroup>
    </ChoWrapper>
  ));
};

export default SectorSetting;
