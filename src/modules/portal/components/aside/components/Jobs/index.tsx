import { useTreeContext } from 'modules/portal/context/Tree/TreeContext';
import { ContextMenu, useContextMenu } from 'react-context-menu-hooks';
import * as S from '../../styled';
import { JobDto } from '../../../../../../api/generated';
import { JobRow } from './Item';
import { jobContextMenuBridge } from './contextMenuBridge';
import _ from 'lodash';
import { useKeyPress } from '../../../../../../utils/keyHandler/useKeyPress';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TabType, useTabContext } from '../../../../context/Tab/TabContext';
import API from '../../../../../../utils/api';
import { useApi } from '../../../../../../utils/hooks/useApi';
import { Skeleton } from '../Skeleton';

export const Jobs = () => {
  const { t } = useTranslation(['portal']);

  const { jobTree, selectJob, selectedJobId, loadingJobTree, refetchJobs } = useTreeContext();
  const jobsRef = useRef(null);
  const { job } = useContextMenu(jobContextMenuBridge);
  const { addTab } = useTabContext();
  const [deleteJob] = useApi<any>();

  const handleDownPressed = () => {
    if (!selectedJobId) {
      const firstJob = _.first(jobTree);
      firstJob && selectJob(firstJob);
      return;
    }

    const index = _.findIndex(jobTree, (e) => e.id === selectedJobId);

    const next = jobTree[index + 1];

    if (next) selectJob(next);
  };

  const handleUpPressed = () => {
    const index = _.findIndex(jobTree, (e) => e.id === selectedJobId);

    const previous = jobTree[index - 1];

    if (previous) selectJob(previous);

    return;
  };

  const handleOpen = (e: any) => {
    if (!job) return;

    selectJob(job);
  };

  const handleNewTab = (e: any) => {
    if (!job) return;

    selectJob(job);
    addTab({ id: job.id, type: TabType.JOB, name: job.name, jobType: job.type });
  };

  const handleDelete = async (e: any) => {
    if (!job) return;

    await deleteJob(() => API.JobsApi.fineProjectManagerApiJobsIdDelete(job.id));

    await refetchJobs();
  };

  useKeyPress('ArrowUp', handleUpPressed, jobTree, jobsRef.current);
  useKeyPress('ArrowDown', handleDownPressed, jobTree, jobsRef.current);

  return (
    <S.Wrapper color={'rgb(143, 113, 52)'} ref={jobsRef} tabIndex={0}>
      <S.Items>
        {loadingJobTree ? (
          <Skeleton />
        ) : (
          jobTree.map((job: JobDto, key: number) => <JobRow key={key} job={job} />)
        )}
      </S.Items>
      <ContextMenu bridge={jobContextMenuBridge}>
        <ContextMenu.Option onClick={handleOpen}>{t('portal:contextMenu.open')}</ContextMenu.Option>
        <ContextMenu.Option onClick={handleNewTab}>
          {t('portal:contextMenu.newTab')}
        </ContextMenu.Option>
        <ContextMenu.Option onClick={handleDelete}>
          {t('portal:contextMenu.delete')}
        </ContextMenu.Option>
      </ContextMenu>
    </S.Wrapper>
  );
};
