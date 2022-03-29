import {AuthWrapper} from "../../components/AuthWrapper";
import * as S from "../../styled";
import {TextInput} from "components/Form/Input/Text/TextInput";
import {RowEnd} from "constants/globalStyles";
import {Button} from "components/Form/Button";
import {useTranslation} from "react-i18next";
import {UseFormHandleSubmit, UseFormRegister} from "react-hook-form";
import {ResetPasswordInput} from "../index";

export const ResetPasswordForm = ({
                                      onSubmit, handleSubmit, register
                                  }: { onSubmit: (data: ResetPasswordInput) => void; handleSubmit: UseFormHandleSubmit<ResetPasswordInput>, register: UseFormRegister<ResetPasswordInput> }) => {
    const {t} = useTranslation(['auth', 'form', 'common']);

    return (<AuthWrapper>
        <S.Title>{t("auth:resetPassword:title")}</S.Title>

        <S.Welcome>{t("auth:resetPassword:description")}</S.Welcome>

        <S.Form onSubmit={handleSubmit(onSubmit)}>
            <TextInput name={"email"} register={register} title={t("form:input.email")}/>
            <RowEnd><Button loading={false} withMargin>{t("auth:button.reset")}</Button></RowEnd>
        </S.Form>
    </AuthWrapper>)
}