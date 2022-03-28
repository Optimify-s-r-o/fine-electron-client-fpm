import * as S from "./styled";
import {PoweredBy} from "components/PoweredBy";
import {ReactNode, useState} from "react";
import {useTranslation} from "react-i18next";
import {Panel} from "./components/Panel";
import {Languages} from "./components/Languages";
import {useEffectAsync} from "../../../../utils/useEffectAsync";

export const AuthWrapper = ({children}: { children: ReactNode }) => {
    const {t} = useTranslation(['auth']);

    const [version, setVersion] = useState("0.0.0")

    useEffectAsync(async () => {
        const appVersion = await window.API.invoke("APP_VERSION");
        setVersion(appVersion)
    }, []);


    return (
        <S.Wrapper>
            <S.Border>
                <Panel/>
                <Languages/>
                <S.Content>
                    {children}
                </S.Content>
                <S.HelpDesk>
                    <S.Info>v{version}</S.Info>
                </S.HelpDesk>
                <S.HelpDesk>
                    <S.Info>{t("auth:helpDesk")}</S.Info>
                </S.HelpDesk>
                <PoweredBy/>
            </S.Border>
        </S.Wrapper>
    )
}