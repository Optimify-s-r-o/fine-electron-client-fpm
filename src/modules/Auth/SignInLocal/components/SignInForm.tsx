import {AuthWrapper} from "../../components/AuthWrapper";
import * as S from "../../styled";
import {ExternalLink} from "../../styled";
import {ColumnTextInput} from "../../../../components/Form/Input/ColumnTextInput";
import {Link} from "../../../../components/Link";
import {createRoute} from "../../../../utils/createRoute";
import {RoutesPath} from "../../../../constants/routes";
import {RowEnd} from "../../../../constants/globalStyles";
import {Button} from "../../../../components/Form/Button";
import {useTranslation} from "react-i18next";
import {UseFormHandleSubmit, UseFormRegister} from "react-hook-form";
import {SignInInput} from "../index";

export const SinInForm = ({
                              onSubmit, handleSubmit, register
                          }: { onSubmit: (data: SignInInput) => void; handleSubmit: UseFormHandleSubmit<SignInInput>, register: UseFormRegister<SignInInput> }) => {
    const {t} = useTranslation(['auth', 'form', 'common']);

    const openWebBrowser = async () => {
        await window.API.openWebBrowser('https://www.fine.cz/geotechnicky-software/');
    }

    return (<AuthWrapper>
            <S.Title>{t("auth:signIn:title")}</S.Title>

            <S.Welcome>{t("auth:signIn:welcome")}</S.Welcome>

            <S.CreateNewUserWrapper>
                <S.CreateNewUserLabel>{t("auth:signIn.createNewUser")}</S.CreateNewUserLabel>
                <ExternalLink onClick={() => openWebBrowser()}>{t("auth:signIn.newUserInstruction")}</ExternalLink>

            </S.CreateNewUserWrapper>

            <S.Form onSubmit={handleSubmit(onSubmit)}>
                <ColumnTextInput name={"server"} register={register} title={t("form:input.server")}/>
                <ColumnTextInput name={"email"} register={register} title={t("form:input.email")}/>
                <ColumnTextInput name={"password"} register={register} title={t("form:input.password")}
                                 rightNode={<Link to={createRoute(RoutesPath.RESET_PASSWORD)}
                                                  title={t("auth:signIn.forgotPassword")}/>}/>
                <RowEnd><Button loading={false} withMargin>{t("form:button.signIn")}</Button></RowEnd>
            </S.Form>
        </AuthWrapper>)
}