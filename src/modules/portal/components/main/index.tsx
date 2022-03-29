import { Outlet } from 'react-router-dom';
import { Tabs } from './components/Tabs';
import * as S from './styled';

export const Main = () => {
  return (
    <S.Wrapper>
      <S.MainSection>
        <Tabs />
        <Outlet />
      </S.MainSection>
    </S.Wrapper>
  );
};
