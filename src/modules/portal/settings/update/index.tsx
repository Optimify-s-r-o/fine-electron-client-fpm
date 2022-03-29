import * as GS from 'constants/globalStyles';
import { useTranslation } from 'react-i18next';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { faUsers } from '@fortawesome/pro-duotone-svg-icons';

const Update = () => {
  const { t } = useTranslation(['portal', 'form', 'common']);

  return (
    <MainWrapper icon={faUsers} title={t('portal:menu.update')}>
      <S.MainContent>
        <S.ContentWrapper>
          <GS.GridRow columns={1}>
            <GS.GridItem fill={1}>
              <GS.Card>content content content content content</GS.Card>
            </GS.GridItem>
          </GS.GridRow>
        </S.ContentWrapper>
      </S.MainContent>
    </MainWrapper>
  );
};

export default Update;
