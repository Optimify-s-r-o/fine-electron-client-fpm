import * as S from "../styled";
import {RoutesPath} from "../../../../../constants/routes";
import {matchPath, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useTranslation} from "react-i18next";
import {faServer} from '@fortawesome/pro-light-svg-icons';
import {Enviroment} from "../styled";

export const Panel = () => {
    const {t} = useTranslation(['auth']);

    const {pathname} = useLocation();

    return (
        <S.Panel>
            <>
                <S.Link
                    to={RoutesPath.SIGN_IN}
                    active={!!matchPath(pathname, RoutesPath.SIGN_IN) ? 1 : 0}
                >
                    <FontAwesomeIcon icon={faServer}/>
                    <Enviroment>
                    {t("auth:button.signIn")}
                </Enviroment>
                </S.Link>
            </>
        </S.Panel>
    );
}