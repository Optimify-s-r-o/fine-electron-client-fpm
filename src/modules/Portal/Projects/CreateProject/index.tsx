import {faFolder} from "@fortawesome/pro-light-svg-icons";
import {RoutesPath} from "../../../../constants/routes";
import {faDatabase} from "@fortawesome/pro-solid-svg-icons";
import * as GS from "constants/globalStyles";
import {Button} from "../../../../components/Form/Button";
import {useTranslation} from "react-i18next";
import {MainWrapper} from "../../components/Main/components/MainWrapper";
import * as S from "../../components/Main/styled";

const CreateProject = () => {
    const {t} = useTranslation(['portal', 'form', 'common']);

    return (<MainWrapper
        icon={faFolder}
        title={t("portal:menu.createProject")}
        actionNode={<div>action</div>}
        navigation={[{
            path: RoutesPath.SYSTEM, active: true, text: "test", icon: faDatabase,
        },
        ]}>
        <S.MainContent>
            <S.ContentWrapper>
                <GS.GridRow columns={3}>
                    <GS.GridItem fill={1}>
                        <GS.Card>
                            content
                            content
                            content
                            content
                            content
                        </GS.Card>
                    </GS.GridItem>
                    <GS.GridItem fill={1}>
                        <GS.Card>
                            content
                            content
                            content
                            content
                            content
                        </GS.Card>
                    </GS.GridItem>
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
            <S.ButtonsWrapper><Button loading={false}>{t("form:button.createProject")}</Button></S.ButtonsWrapper>
        </S.MainContent>
    </MainWrapper>)
}

export default CreateProject;