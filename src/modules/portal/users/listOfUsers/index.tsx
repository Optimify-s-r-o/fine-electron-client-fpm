import { Button } from '../../../../components/Form/Button';
import { useTranslation } from 'react-i18next';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { faUsers } from '@fortawesome/pro-duotone-svg-icons';
import { List } from './components/Table';
import { RoutesPath } from '../../../../constants/routes';
import { Link } from 'react-router-dom';

const ListOfUsers = () => {
  const { t } = useTranslation(['portal', 'form', 'common']);

  return (
    <MainWrapper icon={faUsers} title={t('portal:menu.listOfUsers')}>
      <S.MainContent>
        <S.ContentWrapper>
          <List />
        </S.ContentWrapper>
        <S.ButtonsWrapper>
          <Link to={RoutesPath.CREATE_USER}>
            <Button>{t('portal:menu.createUser')}</Button>
          </Link>
        </S.ButtonsWrapper>
      </S.MainContent>
    </MainWrapper>
  );
};

export default ListOfUsers;
