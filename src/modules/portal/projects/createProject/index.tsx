import { faFolder } from '@fortawesome/pro-light-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ProjectCreateRequest, ProjectDto } from 'api/generated';
import { Button } from 'components/Form/Button';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import * as Yup from 'yup';

import { uploadProjectAttachmentAsync } from '../../../../utils/file';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { useTreeContext } from '../../context/Tree/TreeContext';
import { CreateProjectForm } from './components/Form';

export interface ProjectCreateRequestForm extends ProjectCreateRequest {
  files: File[];
}

const CreateProject = () => {
  const { t } = useTranslation(['portal', 'form', 'common']);
  const { handleNewProject } = useTreeContext();

  const [createProject] = useApi<ProjectDto, ProjectCreateRequest>();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ProjectCreateRequestForm>({
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required(t('form:validation.required'))
      })
    ),
    defaultValues: {
      name: '',
      description: '',
      files: []
    }
  });

  const onSubmit = async (data: ProjectCreateRequestForm) => {
    try {
      toast.info(t('portal:projects.create.creatingInfo'));

      const response = await createProject(() =>
        API.ProjectsApi.fineProjectManagerApiProjectsPost({
          name: data.name,
          description: data.description
        })
      );

      toast.success(t('portal:projects.create.creatingDone'));

      if (!data.files) return;

      toast.info(t('portal:attachments.attachmentsInfo'));

      for (const file of data.files) {
        await uploadProjectAttachmentAsync(response.id, file);
      }

      toast.success(t('portal:attachments.attachmentsDone'));

      await handleNewProject(response);
    } catch (e) {}
  };

  return (
    <MainWrapper icon={faFolder} title={t('portal:menu.createProject')}>
      <S.MainFormContent onSubmit={handleSubmit(onSubmit)}>
        <S.ContentWrapper>
          <CreateProjectForm errors={errors} control={control} register={register} watch={watch} />
        </S.ContentWrapper>
        <S.ButtonsWrapper>
          <Button loading={isSubmitting}>{t('form:button.createProject')}</Button>
        </S.ButtonsWrapper>
      </S.MainFormContent>
    </MainWrapper>
  );
};

export default CreateProject;
