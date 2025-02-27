import styled from "styled-components";
import HeaderButtons, { HeaderButtonsProps } from "./HeaderButtons";

interface PageHeaderProps {
  title: string;
  headerButtons: HeaderButtonsProps;
  // Todo 드롭다운 추가
}

const PageHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const PageTitle = styled.div`
  color: #fff;
  font-size: 28px;
  font-weight: 700;
`;

const PageHeader: React.FC<PageHeaderProps> = ({ title, headerButtons }) => {
  return (
    <PageHeaderContainer>
      <PageTitle>{title}</PageTitle>
      <HeaderButtons {...headerButtons} />
    </PageHeaderContainer>
  );
};

export default PageHeader;
