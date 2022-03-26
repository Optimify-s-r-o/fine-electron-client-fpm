import {Tabs} from "./components/Tabs";
import * as S from "./styled";
import {ButtonsWrapper} from "./styled";
import {MainWrapper} from "./components/MainWrapper";
import {faFolder} from "@fortawesome/pro-light-svg-icons";
import {RoutesPath} from "../../../../constants/routes";
import {faDatabase} from "@fortawesome/pro-solid-svg-icons";
import * as GS from "constants/globalStyles";
import {Button} from "../../../../components/Form/Button";
import {useTranslation} from "react-i18next";

export const Main = () => {
    const {t} = useTranslation(['auth', 'form', 'common']);

    return (<S.Wrapper>
        <S.MainSection>
            <Tabs/>
            <MainWrapper icon={faFolder} title={"Nový projekt"} actionNode={<div>action</div>} navigation={[{
                path: RoutesPath.BACKUP, active: true, text: "xcccssdsdc", icon: faDatabase,
            }, {
                path: RoutesPath.PROJECT_BIN, active: false, text: "xcwwwwccc", icon: faDatabase,
            }, {
                path: RoutesPath.ABOUT_PROGRAM, active: false, text: "xcccc", icon: faDatabase,
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
                    <ButtonsWrapper><Button loading={false}>{t("form:button.createProject")}</Button></ButtonsWrapper>
                </S.MainContent>
            </MainWrapper>
        </S.MainSection>
    </S.Wrapper>)
}