import { faFolder } from '@fortawesome/pro-light-svg-icons';
import { faDatabase } from '@fortawesome/pro-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ProjectDto, ProjectUpdateRequest } from 'api/generated';
import { RoutesPath } from 'constants/routes';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import * as Yup from 'yup';

import { ProjectJobsDto } from 'api/generated/api';
import { useEffectAsync } from 'utils/useEffectAsync';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { toast } from 'react-toastify';
import { ProjectForm } from './components/Form';

const EditProject = () => {
  const { editId } = useParams();
  const { t } = useTranslation(['portal', 'form', 'common', 'project']);

  const [getProjectMain, { data: project, loading }] = useApi<ProjectDto>();
  const [getProjectJobs, { data }] = useApi<ProjectJobsDto>();
  const [saveProject, { loading: saving }] = useApi<ProjectUpdateRequest>();

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
        <ProjectForm
          data={data}
          errors={errors}
          loading={loading}
          register={register}
          saving={saving}
        />
      </S.MainFormContent>
    </MainWrapper>
  );
};

export default EditProject;
