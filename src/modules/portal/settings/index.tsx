import { faCog, faDatabase } from '@fortawesome/pro-light-svg-icons';
import { RoutesPath } from 'constants/routes';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { matchPath, Outlet } from 'react-router-dom';
import { MainWrapper } from '../components/main/components/MainWrapper';

export const Settings = () => {
  const { t } = useTranslation(['portal']);
  const { pathname } = useLocation();

  return (
    <MainWrapper
      icon={faCog}
      title={t('portal:settings.title')}
      navigation={[
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
      <Outlet />
    </MainWrapper>
  );
};

export default Settings;
