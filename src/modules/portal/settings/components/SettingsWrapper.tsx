import { faCog, faDatabase } from '@fortawesome/pro-light-svg-icons';
import { RoutesPath } from '../../../../constants/routes';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import { useLocation } from 'react-router';
import { matchPath } from 'react-router-dom';

export const SettingsWrapper = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation(['portal']);
  const { pathname } = useLocation();

  return (
    <MainWrapper
      icon={faCog}
      title={t('portal:settings.title')}
      navigation={[
        {
          path: RoutesPath.SYSTEM,
          active: !!matchPath(pathname, RoutesPath.SYSTEM),
          text: t('portal:settings.tabs.system'),
          icon: faDatabase
        },
        {
          path: RoutesPath.LOCAL_APPLICATIONS_SETTINGS,
          active: !!matchPath(pathname, RoutesPath.LOCAL_APPLICATIONS_SETTINGS),
          text: t('portal:settings.tabs.applicationsSettings'),
          icon: faDatabase
        },
        {
          path: RoutesPath.UPDATE,
          active: !!matchPath(pathname, RoutesPath.UPDATE),
          text: t('portal:settings.tabs.update'),
          icon: faDatabase
        }
      ]}>
      {children}
    </MainWrapper>
  );
};
