import { Navigation } from './components/navigation';
import { Main } from './components/main';
import { Aside } from './components/aside';
import { Row } from 'constants/globalStyles';
import styled from 'styled-components';
import { useShortcutWrapper } from './components/shortcuts';

export const Portal = () => {
  useShortcutWrapper();

  return (
    <Wrapper>
      <Navigation />
      <RowWrapper>
        <Aside />
        <Main />
      </RowWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const RowWrapper = styled(Row)`
  height: calc(100vh - 32px);
`;

export default Portal;
