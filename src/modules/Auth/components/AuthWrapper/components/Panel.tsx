import * as S from "../styled";
import {RoutesPath} from "../../../../../constants/routes";
import {matchPath, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useTranslation} from "react-i18next";
import {faCloud, faServer} from '@fortawesome/pro-light-svg-icons';
import {Enviroment} from "../styled";

export const Panel = () => {
    const {t} = useTranslation(['auth']);

    const {pathname} = useLocation();

    return (
        <S.Panel>
            <>
                <S.Link
                    to={RoutesPath.SIGN_IN_CLOUD}
                    active={!!matchPath(pathname, RoutesPath.SIGN_IN_CLOUD)}
                >
                    <FontAwesomeIcon icon={faCloud}/>
                    <Enviroment>
                    {t("auth:environments.cloud")}
                </Enviroment>
                </S.Link>
                <S.Link
                    to={RoutesPath.SIGN_IN_LOCAL}
                    active={!!matchPath(pathname, RoutesPath.SIGN_IN_LOCAL)}
                >
                    <FontAwesomeIcon icon={faServer}/>
                    <Enviroment>
                    {t("auth:environments.local")}
                </Enviroment>
                </S.Link>
            </>
        </S.Panel>
    );
}