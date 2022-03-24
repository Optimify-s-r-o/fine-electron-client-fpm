import ReactCountryFlag from "react-country-flag"
import * as S from "../styled";
import {useTranslation} from "react-i18next";

export const Languages = () => {
    const {i18n} = useTranslation();

    const changeLanguage = (lng: "cs" | "en") => {
        i18n.changeLanguage(lng);
    }

    return (<S.LanguageWrapper>
        <S.Language active={i18n.language==="cs" ? 1 : 0} onClick={()=>changeLanguage('cs')}>
            <ReactCountryFlag
                countryCode="CZ"
                svg
                style={{
                    width: '1.5em', height: '1.5em',
                }}
            />
        </S.Language>
        <S.Language  active={i18n.language==="en" ? 1 : 0} onClick={()=>changeLanguage('en')}>
            <ReactCountryFlag
                countryCode="GB"
                svg
                style={{
                    width: '1.5em', height: '1.5em',
                }}
            />

        </S.Language>
    </S.LanguageWrapper>)
}