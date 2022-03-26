import {Row} from "constants/globalStyles";
import {Panel} from "./components/Panel";
import {Tree} from "./components/Tree";
import {faBookUser, faCog, faSearch, faUsers,} from "@fortawesome/pro-duotone-svg-icons";
import {useTranslation} from "react-i18next";
import {faFolders} from "@fortawesome/pro-duotone-svg-icons/faFolders";
import styled from "styled-components";

export const Aside = () => {
    const {t} = useTranslation(['portal']);
    return (
        <aside>
            <RowWrapper>
                <Panel sections={[
                    {
                        icon: faSearch,
                        tooltip: t("portal:menu.search"),
                        isActive: true,
                        callback: () => {
                        }
                    },
                    {
                        icon: faFolders,
                        tooltip: t("portal:menu.listOfProjects"),
                        isActive: false,
                        callback: () => {
                        }
                    },
                    {
                        icon: faBookUser,
                        tooltip: t("portal:menu.listOfCustomers"),
                        isActive: false,
                        callback: () => {
                        }
                    },
                    {
                        icon: faUsers,
                        tooltip: t("portal:menu.listOfUsers"),
                        isActive: false,
                        callback: () => {
                        }
                    },
                    {
                        icon: faCog,
                        tooltip: t("portal:menu.settings"),
                        isActive: false,
                        callback: () => {
                        }
                    },
                ]}/>
                <Tree/>
            </RowWrapper>
        </aside>
    )
}

const RowWrapper = styled(Row)`
  height: 100%;
`