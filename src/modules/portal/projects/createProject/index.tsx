import {faFolder} from '@fortawesome/pro-light-svg-icons';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {ProjectCreateRequest, ProjectDto} from 'api/generated';
import {Button} from 'components/Form/Button';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import API from 'utils/api';
import {useApi} from 'utils/hooks/useApi';
import {useEffectAsync} from 'utils/useEffectAsync';
import * as Yup from 'yup';

import {MainWrapper} from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import {useTreeContext} from '../../context/Tree/TreeContext';
import {CreateProjectForm} from './components/Form';

//TODO MARA nebo RICHARD
// Hláška na chybějící název
const CreateProject = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [createdProject, setCreatedProject] = useState<ProjectDto | null>(null);

    const {t} = useTranslation(['portal', 'form', 'common']);
    const {handleNewProject} = useTreeContext();

    const [createProject, {loading: projectLoading}] = useApi<ProjectDto, ProjectCreateRequest>();

    const {register, handleSubmit} = useForm<ProjectCreateRequest>({
        resolver: yupResolver(Yup.object().shape({
            name: Yup.string()
                .required(t("form:validation.required")),
        })),
    });

    //Control loading state
    useEffect(() => {
        setLoading(projectLoading);
    }, [projectLoading]);

    //Leave page and navigate to new job if request is success
    useEffectAsync(async () => {
        if (!loading && createdProject) {
            handleNewProject(createdProject);
        }
    }, [loading, createdProject]);

    const onSubmit = async (data: ProjectCreateRequest) => {

        console.log(data);
        toast.info(t("portal:projects.create.creatingInfo"));

        const response = await createProject(() => API.ProjectsApi.fineProjectManagerApiProjectsPost(data));

        toast.info(t("portal:projects.create.creatingDone"));

        // log only if there are files to upload
        toast.info(t("portal:projects.create.attachmentsInfo"));
        toast.info(t("portal:projects.create.attachmentsDone"));
        setCreatedProject(response);
    };

    return (<MainWrapper
        icon={faFolder}
        title={t("portal:menu.createProject")}>
        <S.MainFormContent onSubmit={handleSubmit(onSubmit)}>
            <S.ContentWrapper>
                <CreateProjectForm register={register}/>
            </S.ContentWrapper>
            <S.ButtonsWrapper><Button loading={loading}>{t("form:button.createProject")}</Button></S.ButtonsWrapper>
        </S.MainFormContent>
    </MainWrapper>);
};

export default CreateProject;