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

  const general = `${RoutesPath.PROJECTS}/${editId}/${projectName}/general`;
  const attachments = `${RoutesPath.PROJECTS}/${editId}/${projectName}/attachments`;

  console.log(pathname);
  console.log(general);
  console.log(matchPath(pathname, general));
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
          path: `${RoutesPath.PROJECTS}/${editId}/${projectName}/attachments`,
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
