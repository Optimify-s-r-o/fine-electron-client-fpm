import { faBarsProgress, faBrowser } from '@fortawesome/pro-light-svg-icons';
import { RoutesPath } from 'constants/routes';
import { TFunction } from 'i18next';

const adminNav = (t: TFunction, activePath: RoutesPath) => [
  {
    path: RoutesPath.ADMIN_APPLICATIONS_SETTINGS,
    active: activePath === RoutesPath.ADMIN_APPLICATIONS_SETTINGS,
    text: t('portal:admin.tabs.applicationsSettings'),
    icon: faBrowser
  },
  {
    path: RoutesPath.ADMIN_JOBS_SETTINGS,
    active: activePath === RoutesPath.ADMIN_JOBS_SETTINGS,
    text: t('portal:admin.tabs.jobsSettings'),
    icon: faBarsProgress
  }
];

export default adminNav;
