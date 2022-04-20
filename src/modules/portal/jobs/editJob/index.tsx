import { faDownload, faFolder } from '@fortawesome/pro-light-svg-icons';
import { faDatabase } from '@fortawesome/pro-solid-svg-icons';
import { Button } from 'components/Form/Button';
import { IconButton } from 'components/Form/Button/IconButton';
import { Gap } from 'constants/globalStyles';
import { RoutesPath } from 'constants/routes';
import { useTranslation } from 'react-i18next';
import { matchPath, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { downloadJob } from 'utils/jobs/downloadJob';

import { JobDto } from '../../../../api/generated';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import { useApplicationContext } from '../../context/Applications/ApplicationsContext';
import { useExecutableApplicationContext } from '../../context/ExecutableApplications/ExecutableApplicationsContext';
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

  const general = `${RoutesPath.JOBS}/${selectedJob?.id}/general`;
  const attachments = `${RoutesPath.JOBS}/${selectedJob?.id}/attachments`;

  return (
    <MainWrapper
      icon={faFolder}
      title={selectedJob?.name}
      actionNode={
        selectedJob?.isOpenable && (
          <Gap>
            <IconButton
              loading={false}
              icon={faDownload}
              onClick={downloadJob(selectedJob?.id)}
              type="button"
              disabled={!selectedJob.isOpenable}
            />
            <Button type="button" onClick={handleOpenApplication}>
              {t('project:job.run')}
            </Button>
          </Gap>
        )
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
