import {Row} from "constants/globalStyles";
import {Panel} from "./components/Panel";
import {Tree} from "./components/Tree";
import {
    faBookUser,
    faCog,
    faFolderPlus,
    faFolderTree,
    faSearch,
    faSuitcase,
    faUserPlus, faUsers,
} from "@fortawesome/pro-duotone-svg-icons";
import {useTranslation} from "react-i18next";
import {faFolders} from "@fortawesome/pro-duotone-svg-icons/faFolders";

export const Aside = () => {
    const {t} = useTranslation(['portal']);
    return (
        <aside>
            <Row>
                <Panel sections={[
                    {
                        icon: faSearch,
                        tooltip: t("portal:menu.search"),
                        isActive: false
                    },
                    {
                        icon: faFolders,
                        tooltip: t("portal:menu.listOfProjects"),
                        isActive: true
                    },
                    {
                        icon: faBookUser,
                        tooltip: t("portal:menu.listOfCustomers"),
                        isActive: true
                    },
                    {
                        icon: faUsers,
                        tooltip: t("portal:menu.listOfUsers"),
                        isActive: true
                    },
                    {
                        icon: faCog,
                        tooltip: t("portal:menu.settings"),
                        isActive: true
                    },
                ]}/>
                <Tree/>
            </Row>
        </aside>
    )
}