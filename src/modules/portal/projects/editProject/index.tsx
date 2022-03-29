import {faFolder} from '@fortawesome/pro-light-svg-icons';
import {faDatabase} from '@fortawesome/pro-solid-svg-icons';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {ProjectCreateRequest} from 'api/generated';
import {Button} from 'components/Form/Button';
import {RoutesPath} from 'constants/routes';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';

import {MainWrapper} from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';

const EditProject = () => {
    const {t} = useTranslation(['portal', 'form', 'common']);

    const {handleSubmit} = useForm<ProjectCreateRequest>({
        resolver: yupResolver(Yup.object().shape({
            name: Yup.string()
                .required(t("form:validation.required")),
        })),
    });

    const onSubmit = async (data: ProjectCreateRequest) => {
        console.log(data)

    };

    return (<MainWrapper
        icon={faFolder}
        title={t("portal:menu.editProject")}
        navigation={[{
            path: RoutesPath.SYSTEM, active: true, text: t("portal:menu.editProject"), icon: faDatabase,
        },]}>
        <S.MainFormContent onSubmit={handleSubmit(onSubmit)}>
            <S.ContentWrapper>
                TODO EDIT PROJECT
            </S.ContentWrapper>
            <S.ButtonsWrapper><Button loading={false}>{t("form:button.save")}</Button></S.ButtonsWrapper>
        </S.MainFormContent>
    </MainWrapper>);
};

export default EditProject;