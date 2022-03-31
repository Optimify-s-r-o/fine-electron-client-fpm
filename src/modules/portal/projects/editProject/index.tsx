import { faFolder } from '@fortawesome/pro-light-svg-icons';
import { RoutesPath } from '../../../../constants/routes';
import { faDatabase } from '@fortawesome/pro-solid-svg-icons';
import { matchPath, Outlet, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MainWrapper } from '../../components/main/components/MainWrapper';

const EditProject = () => {
  const { t } = useTranslation(['portal', 'form', 'common', 'project']);

  const { editId, projectName } = useParams();
  const { pathname } = useLocation();

  const name = encodeURIComponent(projectName as string);

  const general = `${RoutesPath.PROJECTS}/${editId}/${name}/general`;
  const attachments = `${RoutesPath.PROJECTS}/${editId}/${name}/attachments`;

  return (
    <MainWrapper
      icon={faFolder}
      title={projectName}
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
