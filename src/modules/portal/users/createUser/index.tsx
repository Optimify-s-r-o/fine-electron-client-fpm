import * as GS from "constants/globalStyles";
import {Button} from "../../../../components/Form/Button";
import {useTranslation} from "react-i18next";
import {MainWrapper} from "../../components/main/components/MainWrapper";
import * as S from "../../components/main/styled";
import {faUserPlus} from "@fortawesome/pro-duotone-svg-icons";

const CreateUser = () => {
    const {t} = useTranslation(['portal', 'form', 'common']);

    return (<MainWrapper
        icon={faUserPlus}
        title={t("portal:menu.createUser")}
    >
        <S.MainContent>
            <S.ContentWrapper>
                <GS.GridRow columns={1}>
                    <GS.GridItem fill={1}>
                        <GS.Card>
                            content
                            content
                            content
                            content
                            content
                        </GS.Card>
                    </GS.GridItem>
                </GS.GridRow>
            </S.ContentWrapper>
            <S.ButtonsWrapper><Button loading={false}>{t("form:button.createUser")}</Button></S.ButtonsWrapper>
        </S.MainContent>
    </MainWrapper>)
}

export default CreateUser;