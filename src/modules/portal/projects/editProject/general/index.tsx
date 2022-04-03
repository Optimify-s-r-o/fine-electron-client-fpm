import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ProjectDto, ProjectUpdateRequest } from 'api/generated';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import * as Yup from 'yup';

import { ProjectJobsDto } from 'api/generated/api';
import { useEffectAsync } from 'utils/useEffectAsync';
import * as S from '../../../components/main/styled';
import { toast } from 'react-toastify';
import { ProjectForm } from '../components/Form';

const EditProjectGeneral = () => {
  const { editId } = useParams();
  const { t } = useTranslation(['portal', 'form', 'toast', 'project']);

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
      toast.success(t('toast.project.savedSuccessfully', { name: data.name }));
    } catch (e) {
      toast.error(t('toast.project.failedToSave', { name: data.name }));
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
    <S.MainFormContent onSubmit={handleSubmit(onSubmit)}>
      <ProjectForm
        data={data}
        errors={errors}
        loading={loading}
        register={register}
        saving={saving}
      />
    </S.MainFormContent>
  );
};

export default EditProjectGeneral;
