import { faChevronLeft, faChevronRight } from '@fortawesome/pro-light-svg-icons';
import { IconButton } from 'components/Form/Button/IconButton';
import { SpaceBetween } from 'constants/globalStyles';
import styled from 'styled-components';

const Pagination = ({
  page,
  pages,
  onPrevious,
  onNext
}: {
  page: number;
  pages: number;
  onPrevious: () => void;
  onNext: () => void;
}) => {
  return (
    <Wrapper>
      <SpaceBetween>
        <IconButton
          loading={false}
          icon={faChevronLeft}
          disabled={page === 1}
          onClick={onPrevious}
        />
        <Page>
          {page} / {pages}
        </Page>
        <IconButton
          loading={false}
          icon={faChevronRight}
          disabled={page === pages}
          onClick={onNext}
        />
      </SpaceBetween>
    </Wrapper>
  );
};

export default Pagination;

const Wrapper = styled.div`
  margin-top: 8px;
  padding: 8px 16px;

  border-top: 1px solid ${(props) => props.theme.common.lightGray};
`;

const Page = styled.div`
  align-self: center;

  color: ${(props) => props.theme.text.gray};
  font-size: 13px;
`;
