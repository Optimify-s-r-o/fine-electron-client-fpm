import { faDatabase } from '@fortawesome/pro-light-svg-icons';
import { RoutesPath } from 'constants/routes';
import { TFunction } from 'i18next';

const adminNav = (t: TFunction, activePath: RoutesPath) => [
  {
    path: RoutesPath.ADMIN_APPLICATIONS_SETTINGS,
    active: activePath === RoutesPath.ADMIN_APPLICATIONS_SETTINGS,
    text: t('portal:admin.tabs.applicationsSettings'),
    icon: faDatabase
  },
  {
    path: RoutesPath.ADMIN_JOBS_SETTINGS,
    active: activePath === RoutesPath.ADMIN_JOBS_SETTINGS,
    text: t('portal:admin.tabs.jobsSettings'),
    icon: faDatabase
  }
];

export default adminNav;
