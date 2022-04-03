import { faFolder } from '@fortawesome/pro-light-svg-icons';
import { faDatabase } from '@fortawesome/pro-solid-svg-icons';
import { RoutesPath } from 'constants/routes';
import { useTranslation } from 'react-i18next';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import { matchPath, Outlet, useLocation, useOutletContext, useParams } from 'react-router-dom';
import { Button } from 'components/Form/Button';
import { useApi } from '../../../../utils/hooks/useApi';
import { JobDto } from '../../../../api/generated';
import { useEffectAsync } from '../../../../utils/useEffectAsync';
import API from '../../../../utils/api';
import { useExecutableApplicationContext } from '../../context/ExecutableApplications/ExecutableApplicationsContext';
import { useApplicationContext } from '../../context/Applications/ApplicationsContext';
import { useTreeContext } from '../../context/Tree/TreeContext';

type JobContextType = { loading: boolean; data?: JobDto | null | undefined };

export const useJob = () => {
  return useOutletContext<JobContextType>();
};

const EditJob = () => {
  const { t } = useTranslation(['portal', 'project']);
  const { pathname } = useLocation();
  const { selectedJob } = useTreeContext();

  const { updateJob } = useExecutableApplicationContext();
  const { getApplicationByCode } = useApplicationContext();


  const handleOpenApplication = async () => {
    const app = getApplicationByCode(selectedJob?.application);

    if (selectedJob?.id && app) {
      await updateJob(selectedJob?.id, app.code);
    }
  };

  const general = `${RoutesPath.JOBS}/${selectedJob?.id}/${selectedJob?.name}/general`;
  const attachments = `${RoutesPath.JOBS}/${selectedJob?.id}/${selectedJob?.name}/attachments`;

  return (
    <MainWrapper
      icon={faFolder}
      title={selectedJob?.name}
      actionNode={
        <Button type="button" onClick={handleOpenApplication}>
          {t('project:job.run')}
        </Button>
      }
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
      <Outlet context={{ selectedJob }} />
    </MainWrapper>
  );
};

export default EditJob;
