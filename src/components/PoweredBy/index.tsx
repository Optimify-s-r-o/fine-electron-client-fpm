import logo from './components/img/logo.svg';
import * as S from './styled';

export const PoweredBy = () => {
  return (
    <S.Wrapper>
      <S.Grid>
        <S.Powered>POWERED BY</S.Powered>
        <a target="_blank" href="https://optimify.cz" rel="noopener noreferrer">
          <S.Logo src={logo} />
        </a>
      </S.Grid>
    </S.Wrapper>
  );
};
