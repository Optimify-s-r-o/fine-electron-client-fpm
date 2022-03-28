import {faFolder} from "@fortawesome/pro-light-svg-icons";
import {RoutesPath} from "constants/routes";
import {faDatabase} from "@fortawesome/pro-solid-svg-icons";
import {Button} from "components/Form/Button";
import {useTranslation} from "react-i18next";
import {MainWrapper} from "../../components/Main/components/MainWrapper";
import * as S from "../../components/Main/styled";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as Yup from "yup";
import {CreateProjectForm} from "./components/Form";
import {ProjectCreateRequest} from "api/generated";

const CreateProject = () => {
    const {t} = useTranslation(['portal', 'form', 'common']);

    const {register, handleSubmit} = useForm<ProjectCreateRequest>({
        resolver: yupResolver(Yup.object().shape({
            name: Yup.string()
                .required(t("form:validation.required")),
        })),
    });

    const onSubmit = async (data: ProjectCreateRequest) => {
        console.log(data);
    }

    return (<MainWrapper
        icon={faFolder}
        title={t("portal:menu.createProject")}
        navigation={[{
            path: RoutesPath.SYSTEM, active: true, text: "test", icon: faDatabase,
        },]}>
        <S.MainFormContent onSubmit={handleSubmit(onSubmit)}>
            <S.ContentWrapper>
                <CreateProjectForm register={register}/>
            </S.ContentWrapper>
            <S.ButtonsWrapper><Button loading={false}>{t("form:button.createProject")}</Button></S.ButtonsWrapper>
        </S.MainFormContent>
    </MainWrapper>)
}

export default CreateProject;