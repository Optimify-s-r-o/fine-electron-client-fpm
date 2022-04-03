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

type JobContextType = { loading: boolean; data?: JobDto | null | undefined };

export const useJob = () => {
  return useOutletContext<JobContextType>();
};

const EditJob = () => {
  const { t } = useTranslation(['portal', 'project']);
  const { jobName, editId } = useParams();
  const { pathname } = useLocation();

  const [getJobMain, { data, loading }] = useApi<JobDto>();

  const { updateJob } = useExecutableApplicationContext();
  const { getApplicationByCode } = useApplicationContext();

  useEffectAsync(async () => {
    if (editId) {
      await getJobMain(() => API.JobsApi.fineProjectManagerApiJobsIdGet(editId));
    }
  }, [editId]);

  const handleOpenApplication = async () => {
    const app = getApplicationByCode(data?.application);

    const jobId = editId;

    if (jobId && app) {
      await updateJob(editId, app.code);
    }
  };
  const name = encodeURIComponent(jobName as string);

  const general = `${RoutesPath.JOBS}/${editId}/${name}/general`;
  const attachments = `${RoutesPath.JOBS}/${editId}/${name}/attachments`;

  return (
    <MainWrapper
      icon={faFolder}
      title={jobName}
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
      <Outlet context={{ data, loading }} />
    </MainWrapper>
  );
};

export default EditJob;
