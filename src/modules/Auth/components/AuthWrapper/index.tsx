import * as S from "./styled";
import {PoweredBy} from "components/PoweredBy";
import {ReactNode} from "react";
import fine from "../assets/fine.png";
import {useTranslation} from "react-i18next";
import {Panel} from "./components/Panel";
import {Languages} from "./components/Languages";

export const AuthWrapper = ({children}: { children: ReactNode }) => {
    const {t} = useTranslation(['auth']);

    return (
        <S.Wrapper>
            <S.Border>
                <Panel/>
                <Languages/>
                <S.FineWrapper>
                    <S.Fine src={fine}/>
                </S.FineWrapper>
                <S.Content>
                    {children}
                </S.Content>
                <S.HelpDesk>
                    <S.Info>{t("auth:helpDesk")}</S.Info>
                </S.HelpDesk>
                <PoweredBy/>
            </S.Border>
        </S.Wrapper>
    )
}