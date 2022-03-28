import * as GS from "constants/globalStyles";
import {useTranslation} from "react-i18next";
import {MainWrapper} from "../../components/Main/components/MainWrapper";
import * as S from "../../components/Main/styled";
import {faCog} from "@fortawesome/pro-duotone-svg-icons";

const System = () => {
    const {t} = useTranslation(['portal', 'form', 'common']);

    return (<MainWrapper
        icon={faCog}
        title={t("portal:menu.system")}
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
        </S.MainContent>
    </MainWrapper>)
}

export default System;