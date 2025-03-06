import styled from "styled-components";

export interface TabItem {
  label: string;
  value: string;
}

interface TabsProps {
  items: TabItem[];
  activeValue: string;
  onChange: (value: string) => void;
}

const TabContainer = styled.div`
  display: flex;
`;

const Tab = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#8B8D91")};
  font-size: 16px;
  font-weight: ${({ $isActive }) => ($isActive ? "700" : "400")};
  border-bottom: 2px solid
    ${({ $isActive }) => ($isActive ? "#fff" : "transparent")};
  padding: 11px 22px;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

const Tabs: React.FC<TabsProps> = ({ items, activeValue, onChange }) => {
  return (
    <TabContainer>
      {items.map((item) => {
        const isActive = item.value === activeValue;
        return (
          <Tab
            key={item.value}
            $isActive={isActive}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </Tab>
        );
      })}
    </TabContainer>
  );
};

export default Tabs;
