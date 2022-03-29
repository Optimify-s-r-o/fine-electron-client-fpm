import { faUsers } from '@fortawesome/pro-duotone-svg-icons';
import { faDatabase } from '@fortawesome/pro-light-svg-icons';
import * as GS from 'constants/globalStyles';
import { RoutesPath } from 'constants/routes';
import { useTranslation } from 'react-i18next';

import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';

const Update = () => {
  const { t } = useTranslation( ['portal', 'form', 'common'] );

  return (
    <MainWrapper icon={faUsers} title={t( 'portal:settings.title' )} navigation={[
      {
        path: `${ RoutesPath.SYSTEM }`,
        active: false,
        text: t( 'portal:settings.tabs.system' ),
        icon: faDatabase
      },
      {
        path: `${ RoutesPath.LOCAL_APPLICATIONS_SETTINGS }`,
        active: false,
        text: t( 'portal:settings.tabs.applicationsSettings' ),
        icon: faDatabase
      },
      {
        path: `${ RoutesPath.UPDATE }`,
        active: true,
        text: t( 'portal:settings.tabs.update' ),
        icon: faDatabase
      },
    ]}>
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
