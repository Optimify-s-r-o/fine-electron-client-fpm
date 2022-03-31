import {
  faArrowRight,
  faArrowUpRightFromSquare,
  faDownload,
  faFolder,
  faTrashCan
} from '@fortawesome/pro-light-svg-icons';
import { faDatabase } from '@fortawesome/pro-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ProjectDto, ProjectUpdateRequest } from 'api/generated';
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
import { MouseEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import useModal from 'utils/hooks/useModal';
import * as Yup from 'yup';

import { JobDto, ProjectJobsDto } from '../../../../api/generated/api';
import { useEffectAsync } from '../../../../utils/useEffectAsync';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { toast } from 'react-toastify';

const EditProject = () => {
  const { editId } = useParams();
  const { t } = useTranslation(['portal', 'form', 'common', 'project']);
  const modal = useModal();

  const [getProjectMain, { data: project, loading }] = useApi<ProjectDto>();
  const [getProjectJobs, { data }] = useApi<ProjectJobsDto>();
  const [saveProject, { loading: saving }] = useApi<ProjectJobsDto>();

  const { getApplicationByCode } = useApplicationContext();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<ProjectUpdateRequest>({
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required(t('form:validation.required'))
      })
    )
  });

  const onSubmit = async (data: ProjectUpdateRequest) => {
    try {
      await saveProject(() => API.ProjectsApi.fineProjectManagerApiProjectsPut(data));
      toast.success(t('project:notifications.savedSuccessfully', { name: data.name }));
    } catch (e) {
      toast.error(t('project:notifications.failedToSave', { name: data.name }));
    }
  };

  useEffectAsync(async () => {
    if (editId) {
      await getProjectMain(() => API.ProjectsApi.fineProjectManagerApiProjectsIdGet(editId));
      await getProjectJobs(() => API.ProjectsApi.fineProjectManagerApiProjectsIdJobsGet(editId));
    }
  }, [editId]);

  useEffect(() => {
    if (!project) return;

    reset({ id: project.id, name: project.name, description: project.description });
  }, [project, reset]);

  const onApplicationOpen = (job: JobDto) => (event: MouseEvent<HTMLButtonElement>) => {
    // TODO open app
  };

  const onViewJob = (job: JobDto) => (event: MouseEvent<HTMLButtonElement>) => {
    // TODO karel path change
  };

  const onDownloadJob = (job: JobDto) => (event: MouseEvent<HTMLButtonElement>) => {
    // TODO karel
  };

  const onDeleteJob = (job: JobDto) => (event: MouseEvent<HTMLButtonElement>) => {
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
      title={loading || !project ? t('project:main.opening') : project.name}
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
          {loading ? (
            ''
          ) : (
            <>
              <GS.GridRow columns={2}>
                <GS.GridItem>
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
                  <Button loading={saving}>{t('form:button.save')}</Button>
                </GS.GridItem>
                <GS.GridItem>
                  <GS.H2>{t('project:main.aboutProject')}</GS.H2>
                  <GS.KeyValueTable>
                    <tbody>
                      <tr>
                        <td>{t('project:main.jobCount')}</td>
                        <td>{data?.jobInformation?.openableCount}</td>
                      </tr>
                      {Object.entries(data?.jobInformation?.otherJobs ?? {}).map((e) => (
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
                                onClick={onApplicationOpen(record)}
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
                        render: (text: string, _r: JobDto) => text,
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
                    dataSource={data?.jobs}
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
