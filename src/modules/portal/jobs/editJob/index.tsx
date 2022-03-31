import { faFolder } from '@fortawesome/pro-light-svg-icons';
import { faDatabase } from '@fortawesome/pro-solid-svg-icons';
import { RoutesPath } from 'constants/routes';
import { useTranslation } from 'react-i18next';

import { MainWrapper } from '../../components/main/components/MainWrapper';
import { matchPath, Outlet, useLocation, useParams } from 'react-router-dom';

const EditProject = () => {
  const { t } = useTranslation(['portal', 'form', 'common']);
  const { jobName, editId } = useParams();
  const { pathname } = useLocation();

  const name = encodeURIComponent(jobName as string);

  const general = `${RoutesPath.JOBS}/${editId}/${name}/general`;
  const attachments = `${RoutesPath.JOBS}/${editId}/${name}/attachments`;

  return (
    <MainWrapper
      icon={faFolder}
      title={jobName}
      navigation={[
        {
          path: general,
          active: !!matchPath(pathname, general),
          text: t('portal:projects.tabs.editProjectMain'),
          icon: faDatabase
        },
        {
          path: attachments,
          active: !!matchPath(pathname, attachments),
          text: t('portal:projects.tabs.editProjectFiles'),
          icon: faDatabase
        }
      ]}>
      <Outlet />
    </MainWrapper>
  );
};

export default EditProject;
