import {
  faArrowRight,
  faArrowUpRightFromSquare,
  faDownload,
  faPlus,
  faTrashCan
} from '@fortawesome/pro-light-svg-icons';
import { ApplicationDto, JobDto } from 'api/generated';
import ApplicationIcon from 'components/ApplicationIcon';
import { DeleteButton } from 'components/Form/Button/DeleteButton';
import { IconButton } from 'components/Form/Button/IconButton';
import { DateFormat } from 'components/Moment';
import { CardTable } from 'components/Table/CardTable';
import * as GS from 'constants/globalStyles';
import { RoutesPath } from 'constants/routes';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import useModal from 'utils/hooks/useModal';

import { useApplicationContext } from '../../../context/Applications/ApplicationsContext';
import { useExecutableApplicationContext } from '../../../context/ExecutableApplications/ExecutableApplicationsContext';
import { useJobTranslationsContext } from '../../../context/JobTranslations/JobTranslationsContext';
import { PlainButton } from '../../../../../components/Form/Button/PlainButton';
import { RowEnd } from 'constants/globalStyles';
import { SelectApplication } from './SelectApplication';
import { useParams } from 'react-router-dom';

export const Jobs = ({ jobs }: { jobs?: JobDto[] }) => {
  const { t } = useTranslation(['portal', 'form', 'common', 'project']);
  const { language, getJobTranslation } = useJobTranslationsContext();
  const { editId } = useParams();
  const modal = useModal();
  const navigate = useNavigate();

  const [deleteJob] = useApi<any>();

  const { updateJob } = useExecutableApplicationContext();
  const { getApplicationByCode } = useApplicationContext();

  const onApplicationOpen =
    (job: JobDto, app: ApplicationDto | null) => async (_e: MouseEvent<HTMLButtonElement>) => {
      if (!app?.code) return;

      await updateJob(job.id, app.code);
    };

  const onViewJob = (job: JobDto) => (_e: MouseEvent<HTMLButtonElement>) => {
    navigate(`${RoutesPath.JOBS}/${job.id}`);
  };

  const onDownloadJob = (job: JobDto) => (_e: MouseEvent<HTMLButtonElement>) => {
    // TODO karel
  };

  const deleteProjectJob = (id: string) => async (_e: MouseEvent<HTMLButtonElement>) => {
    try {
      modal.closeModal();
      await deleteJob(() => API.JobsApi.fineProjectManagerApiJobsIdDelete(id));
    } catch (e) {}
  };

  const onDeleteJob = (job: JobDto) => (_e: MouseEvent<HTMLButtonElement>) => {
    modal.showModal({
      title: t('form:table.jobDeleteHeader'),
      content: <>{t('form:table.jobDeleteContent', { jobName: job.name })}</>,
      footer: (
        <GS.FloatRight>
          <DeleteButton loading={false} onClick={deleteProjectJob(job.id)}>
            {t('form:button.deleteJob')}
          </DeleteButton>
        </GS.FloatRight>
      )
    });
  };

  const createJob = (e: MouseEvent<HTMLButtonElement>) => {
    if (!editId) return;

    modal.showModal({
      title: t('portal:createJob.title'),
      content: <SelectApplication projectId={editId} />
    });
  };
  return (
    <>
      <GS.HR />
      <RowEnd>
        <PlainButton loading={false} icon={faPlus} type="button" onClick={createJob}>
          {t('form:button.addJob')}
        </PlainButton>
      </RowEnd>
      <GS.GridRow columns={1}>
        <GS.GridItem>
          <CardTable
            columns={[
              {
                title: t('form:table.jobName'),
                render: (text: string, record: JobDto) => text,
                dataIndex: 'name'
              },
              {
                title: t('form:table.jobDescription'),
                render: (text: string, record: JobDto) => text,
                dataIndex: 'description'
              },
              {
                title: t('form:table.jobType'),
                render: (text: string, record: JobDto) => getJobTranslation(text, language),
                dataIndex: 'type'
              },
              {
                title: t('form:table.jobApplication'),
                render: (text: string, record: JobDto) => {
                  const app = getApplicationByCode(record?.application);
                  return record.isOpenable ? (
                    <GS.GapAlignCenter>
                      {app && <ApplicationIcon application={app} />}
                      <span>{app ? app.name : text}</span>
                      <IconButton
                        loading={false}
                        icon={faArrowUpRightFromSquare}
                        onClick={onApplicationOpen(record, app)}
                        type="button"
                      />
                    </GS.GapAlignCenter>
                  ) : (
                    <></>
                  );
                },
                dataIndex: 'application'
              },
              {
                title: t('form:table.jobAdded'),
                render: (text: string, _r: JobDto) => <DateFormat date={text} />,
                dataIndex: 'createdAt'
              },
              {
                title: '',
                render: (_text: undefined, record: JobDto) => (
                  <GS.FloatRight>
                    <GS.Gap>
                      <IconButton
                        loading={false}
                        icon={faArrowRight}
                        btnStyle="primary"
                        onClick={onViewJob(record)}
                        type="button"
                      />
                      <IconButton
                        loading={false}
                        icon={faDownload}
                        onClick={onDownloadJob(record)}
                        type="button"
                      />
                      <IconButton
                        loading={false}
                        icon={faTrashCan}
                        onClick={onDeleteJob(record)}
                        type="button"
                      />
                    </GS.Gap>
                  </GS.FloatRight>
                )
              }
            ]}
            dataSource={jobs}
            emptyTableText={t('form:table.noJobs')}
          />
        </GS.GridItem>
      </GS.GridRow>
    </>
  );
};
