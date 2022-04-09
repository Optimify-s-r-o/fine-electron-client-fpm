import { faFolder } from '@fortawesome/pro-light-svg-icons';
import { faDatabase } from '@fortawesome/pro-solid-svg-icons';
import { RoutesPath } from 'constants/routes';
import { useTranslation } from 'react-i18next';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import { matchPath, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { Button } from 'components/Form/Button';
import { JobDto } from '../../../../api/generated';
import { useExecutableApplicationContext } from '../../context/ExecutableApplications/ExecutableApplicationsContext';
import { useApplicationContext } from '../../context/Applications/ApplicationsContext';
import { useTreeContext } from '../../context/Tree/TreeContext';
import ProgressModal from 'components/Progress/ProgressModal';
import { ProgressStatus } from 'utils/hooks/useProgress';

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
        selectedJob?.isOpenable ? (
          <Button type="button" onClick={handleOpenApplication}>
            {t('project:job.run')}
          </Button>
        ) : (
          <ProgressModal
            triggerText="Test progress modal"
            titleText="Testing progress modal"
            run={async (addItem, setItemStatus, finish) => {
              let i = 0;
              const add = (text: string) => {
                const y = addItem(text);
                setTimeout(() => {
                  setItemStatus(y, ProgressStatus.Success);
                }, 1234);
              };

              addItem('Lorem ipsum dolor sit amet', ProgressStatus.Waiting);
              add('Test ' + i);
              i++;
              const interval = setInterval(() => {
                add('Test ' + i);
                i++;
                if (i > 10) {
                  clearInterval(interval);
                  setItemStatus(0, ProgressStatus.Fail);
                  finish();
                }
              }, 1234);
              return;
            }}
          />
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
