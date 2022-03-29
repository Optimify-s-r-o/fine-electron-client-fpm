import { faFolder } from '@fortawesome/pro-light-svg-icons';
import { faDatabase } from '@fortawesome/pro-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ProjectCreateRequest, ProjectDto } from 'api/generated';
import { Button } from 'components/Form/Button';
import { RoutesPath } from 'constants/routes';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import * as Yup from 'yup';

import { MainWrapper } from '../../components/Main/components/MainWrapper';
import * as S from '../../components/Main/styled';
import { CreateProjectForm } from './components/Form';

//TODO MARA nebo RICHARD
// Hláška na chybějící název
const CreateProject = () => {
    const [loading, setLoading] = useState<boolean>( false );
    const [createdProjectId, setCreatedProjectId] = useState<string | null>( null );

    const { t } = useTranslation( ['portal', 'form', 'common'] );
    const navigate = useNavigate();

    const [createProject, { loading: projectLoading }] = useApi<ProjectDto, ProjectCreateRequest>();

    const { register, handleSubmit } = useForm<ProjectCreateRequest>( {
        resolver: yupResolver( Yup.object().shape( {
            name: Yup.string()
                .required( t( "form:validation.required" ) ),
        } ) ),
    } );

    //Control loading state
    useEffect( () => {
        setLoading( projectLoading );
    }, [projectLoading] );

    //Leave page and navigate to new job if request is success
    useEffect( () => {
        if ( !loading && createdProjectId ) {
            navigate( RoutesPath.SYSTEM, { replace: true } ); //TODO RICHARD spravna cesta kam se ma navigovat po vytvoreni projektu
        }
    }, [loading, createdProjectId, navigate] );

    const onSubmit = async ( data: ProjectCreateRequest ) => {

        console.log( data );
        toast.info( t( "portal:projects.create.creatingInfo" ) );

        const response = await createProject( () => API.ProjectsApi.fineProjectManagerApiProjectsPost( data ) );

        toast.info( t( "portal:projects.create.creatingDone" ) );

        // log only if there are files to upload
        toast.info( t( "portal:projects.create.attachmentsInfo" ) );
        toast.info( t( "portal:projects.create.attachmentsDone" ) );
        setCreatedProjectId( response.id );
    };

    return ( <MainWrapper
        icon={faFolder}
        title={t( "portal:menu.createProject" )}
        navigation={[{
            path: RoutesPath.SYSTEM, active: true, text: t( "portal:projects.tabs.newProject" ), icon: faDatabase,
        },]}>
        <S.MainFormContent onSubmit={handleSubmit( onSubmit )}>
            <S.ContentWrapper>
                <CreateProjectForm register={register} />
            </S.ContentWrapper>
            <S.ButtonsWrapper><Button loading={loading}>{t( "form:button.createProject" )}</Button></S.ButtonsWrapper>
        </S.MainFormContent>
    </MainWrapper> );
};

export default CreateProject;