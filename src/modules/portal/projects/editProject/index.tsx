import {
  faArrowRight,
  faArrowUpRightFromSquare,
  faDownload,
  faFolder,
  faTrashCan
} from '@fortawesome/pro-light-svg-icons';
import { faDatabase } from '@fortawesome/pro-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ProjectCreateRequest, ProjectDto } from 'api/generated';
import ApplicationIcon from 'components/ApplicationIcon';
import { Button } from 'components/Form/Button';
import { DeleteButton } from 'components/Form/Button/DeleteButton';
import { IconButton } from 'components/Form/Button/IconButton';
import { TextAreaInput } from 'components/Form/Input/Text/TextAreaInput';
import { TextInput } from 'components/Form/Input/Text/TextInput';
import { CardTable } from 'components/Table/CardTable';
import * as GS from 'constants/globalStyles';
import { RoutesPath } from 'constants/routes';
import { useApplicationContext } from 'modules/portal/context/Applications/ApplicationsContext';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import useModal from 'utils/hooks/useModal';
import * as Yup from 'yup';

import { JobDto, JobResultInformationDto, ProjectJobsDto } from '../../../../api/generated/api';
import { useEffectAsync } from '../../../../utils/useEffectAsync';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';

const EditProject = () => {
  const { editId } = useParams();
  const { t } = useTranslation(['portal', 'form', 'common']);
  const modal = useModal();

  const [getProjectMain, { loading: mainLoading }] = useApi<ProjectDto>();
  const [getProjectJobs, { loading: jobsLoading }] = useApi<ProjectJobsDto>();
  const { getApplicationByCode } = useApplicationContext();

  const [mainData, setMainData] = useState<ProjectDto | null>(null);
  const [jobsData, setJobsData] = useState<JobDto[]>([]);
  const [jobsInformation, setJobsInformation] = useState<JobResultInformationDto | null>(null);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<ProjectCreateRequest>({
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required(t('form:validation.required'))
      })
    )
  });

  const onSubmit = async (data: ProjectCreateRequest) => {
    console.log(data);
  };

  //Load everything during window open
  useEffectAsync(async () => {
    if (editId) {
      const res = await getProjectMain(() =>
        API.ProjectsApi.fineProjectManagerApiProjectsIdGet(editId)
      );
      setMainData(res);
    }
  }, [editId]);

  useEffectAsync(async () => {
    if (editId) {
      const res = await getProjectJobs(() =>
        API.ProjectsApi.fineProjectManagerApiProjectsIdJobsGet(editId)
      );
      setJobsData(res.jobs);
      setJobsInformation(res.jobInformation);
    }
  }, [editId]);

  useEffect(() => {
    setValue('name', mainData?.name ?? '');
    setValue('description', mainData?.description ?? '');
  }, [mainData, setValue]);

  const onApplicationOpen = (job: JobDto) => {
    // TODO open app
  };

  const onViewJob = (job: JobDto) => {
    // TODO karel path change
  };

  const onDownloadJob = (job: JobDto) => {
    // TODO karel
  };

  const onDeleteJob = (job: JobDto) => {
    modal.showModal({
      title: t('form:table.jobDeleteHeader'),
      content: <>{t('form:table.jobDeleteContent', { jobName: job.name })}</>,
      footer: (
        <GS.FloatRight>
          <DeleteButton
            loading={false}
            onClick={() => {
              // TODO karel
              modal.closeModal();
            }}>
            {t('form:button.deleteJob')}
          </DeleteButton>
        </GS.FloatRight>
      )
    });
  };

  return (
    <MainWrapper
      icon={faFolder}
      title={mainLoading || !mainData ? 'Otvírám projekt...' : mainData.name}
      navigation={[
        {
          path: `${RoutesPath.PROJECTS}/${editId}`,
          active: true,
          text: t('portal:projects.tabs.editProjectMain'),
          icon: faDatabase
        },
        {
          path: `${RoutesPath.PROJECTS}/${editId}/files`,
          active: false,
          text: t('portal:projects.tabs.editProjectFiles'),
          icon: faDatabase
        }
      ]}>
      <S.MainFormContent onSubmit={handleSubmit(onSubmit)}>
        <S.ContentWrapper>
          {mainLoading ? (
            ''
          ) : (
            <>
              <GS.GridRow columns={2}>
                <GS.GridItem>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                      errors={errors}
                      name={'name'}
                      register={register}
                      title={t('form:input.projectName')}
                    />
                    <TextAreaInput
                      name={'description'}
                      register={register}
                      title={t('form:input.projectDescription')}
                    />
                    <Button loading={false}>{t('form:button.save')}</Button>
                  </form>
                </GS.GridItem>
                <GS.GridItem>
                  <GS.H2>Informace o projektu</GS.H2>
                  <GS.KeyValueTable>
                    <tbody>
                      <tr>
                        <td>Počet úloh</td>
                        <td>{jobsInformation?.openableCount}</td>
                      </tr>
                      {Object.entries(jobsInformation?.otherJobs ?? {}).map((e) => (
                        <tr>
                          <td>{e[0]}</td>
                          <td>{e[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </GS.KeyValueTable>
                </GS.GridItem>
              </GS.GridRow>
              <GS.HR />
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
                        render: (text: string, record: JobDto) => text,
                        dataIndex: 'type'
                      },
                      {
                        title: t('form:table.jobApplication'),
                        render: (text: string, record: JobDto) => {
                          const app = getApplicationByCode(text);
                          return record.isOpenable ? (
                            <GS.GapAlignCenter>
                              {app && <ApplicationIcon application={app} />}
                              <span>{app ? app.name : text}</span>
                              <IconButton
                                loading={false}
                                icon={faArrowUpRightFromSquare}
                                onClick={() => {
                                  onApplicationOpen(record);
                                }}
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
                        render: (text: string, record: JobDto) => text,
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
                                onClick={() => {
                                  onViewJob(record);
                                }}
                                type="button"
                              />
                              <IconButton
                                loading={false}
                                icon={faDownload}
                                onClick={() => {
                                  onDownloadJob(record);
                                }}
                                type="button"
                              />
                              <IconButton
                                loading={false}
                                icon={faTrashCan}
                                onClick={() => {
                                  onDeleteJob(record);
                                }}
                                type="button"
                              />
                            </GS.Gap>
                          </GS.FloatRight>
                        )
                      }
                    ]}
                    dataSource={jobsData}
                    emptyTableText={t('form:table.noJobs')}
                  />
                </GS.GridItem>
              </GS.GridRow>
            </>
          )}
        </S.ContentWrapper>
      </S.MainFormContent>
    </MainWrapper>
  );
};

export default EditProject;
