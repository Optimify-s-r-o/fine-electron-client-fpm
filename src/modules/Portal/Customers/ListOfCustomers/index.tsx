import * as GS from "constants/globalStyles";
import {Button} from "../../../../components/Form/Button";
import {useTranslation} from "react-i18next";
import {MainWrapper} from "../../components/Main/components/MainWrapper";
import * as S from "../../components/Main/styled";
import {faBookUser} from "@fortawesome/pro-duotone-svg-icons";

const ListOfCustomers = () => {
    const {t} = useTranslation(['portal', 'form', 'common']);

    return (<MainWrapper
        icon={faBookUser}
        title={t("portal:menu.listOfCustomers")}
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
            <S.ButtonsWrapper><Button loading={false}>{t("portal:menu.createCustomer")}</Button></S.ButtonsWrapper>
        </S.MainContent>
    </MainWrapper>)
}

export default ListOfCustomers;