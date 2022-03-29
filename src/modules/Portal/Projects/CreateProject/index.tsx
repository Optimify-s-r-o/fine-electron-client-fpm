import { faFolder } from '@fortawesome/pro-light-svg-icons';
import { faDatabase } from '@fortawesome/pro-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ProjectCreateRequest } from 'api/generated';
import { Button } from 'components/Form/Button';
import { RoutesPath } from 'constants/routes';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { MainWrapper } from '../../components/Main/components/MainWrapper';
import * as S from '../../components/Main/styled';
import { CreateProjectForm } from './components/Form';

const CreateProject = () => {
    const { t } = useTranslation( ['portal', 'form', 'common'] );

    const { register, handleSubmit } = useForm<ProjectCreateRequest>( {
        resolver: yupResolver( Yup.object().shape( {
            name: Yup.string()
                .required( t( "form:validation.required" ) ),
        } ) ),
    } );

    const onSubmit = async ( data: ProjectCreateRequest ) => {
        console.log( data );
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
            <S.ButtonsWrapper><Button loading={false}>{t( "form:button.createProject" )}</Button></S.ButtonsWrapper>
        </S.MainFormContent>
    </MainWrapper> );
};

export default CreateProject;