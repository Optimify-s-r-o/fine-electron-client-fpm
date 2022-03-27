import {AuthWrapper} from "../../components/AuthWrapper";
import * as S from "../../styled";
import {ExternalLink} from "../../styled";
import {TextInput} from "../../../../components/Form/Input/Text/TextInput";
import {Link} from "../../../../components/Link";
import {createRoute} from "../../../../utils/createRoute";
import {RoutesPath} from "../../../../constants/routes";
import {RowEnd} from "../../../../constants/globalStyles";
import {Button} from "../../../../components/Form/Button";
import {useTranslation} from "react-i18next";
import {UseFormHandleSubmit, UseFormRegister} from "react-hook-form";
import {SignInInput} from "../index";
import {PasswordInput} from "../../../../components/Form/Input/Password";

export const SinInForm = ({
                              onSubmit, handleSubmit, loading, register
                          }: { onSubmit: (data: SignInInput) => void; handleSubmit: UseFormHandleSubmit<SignInInput>, loading: boolean; register: UseFormRegister<SignInInput> }) => {
    const {t} = useTranslation(['auth', 'form', 'common']);

    const openWebBrowser = async () => {
        await window.API.openWebBrowser('https://www.fine.cz/geotechnicky-software/');
    }

    return (<AuthWrapper>
        <S.Title>{t("auth:signIn:title")}</S.Title>

        <S.CreateNewUserWrapper>
            <S.CreateNewUserLabel>{t("auth:signIn.createNewUser")}</S.CreateNewUserLabel>
            <ExternalLink onClick={() => openWebBrowser()}>{t("auth:signIn.newUserInstruction")}</ExternalLink>

        </S.CreateNewUserWrapper>

        <S.Form onSubmit={handleSubmit(onSubmit)}>
            <TextInput name={"server"} register={register} title={t("form:input.server")} isDisabled={true}/>
            <TextInput name={"email"} register={register} title={t("form:input.email")}/>
            <PasswordInput name={"password"} register={register} title={t("form:input.password")}
                           rightNode={<Link to={createRoute(RoutesPath.RESET_PASSWORD)}
                                            title={t("auth:signIn.forgotPassword")}/>}/>
            <RowEnd><Button loading={loading} withMargin>{t("form:button.signIn")}</Button></RowEnd>
        </S.Form>
    </AuthWrapper>)
}