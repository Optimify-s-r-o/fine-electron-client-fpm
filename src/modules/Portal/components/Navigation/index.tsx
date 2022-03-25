import {Menu} from "./types";
import {useTranslation} from "react-i18next";
import {RoutesPath} from "../../../../constants/routes";
import {Nav} from "./components/Nav";
import {
    faBookUser,
    faBrowser,
    faBuilding,
    faCog,
    faDatabase,
    faFolder,
    faFolderPlus,
    faHomeLgAlt,
    faSuitcase,
    faUserPlus,
    faUsers
} from "@fortawesome/pro-duotone-svg-icons";
import {faFolders} from "@fortawesome/pro-duotone-svg-icons/faFolders";

export const Navigation = () => {
    const {t} = useTranslation(['portal']);

    const menu: Menu[] = [
        {
            menu: t("portal:menu.projects"),
            submenu: [
                {
                    path: RoutesPath.CREATE_PROJECT,
                    text: t("portal:menu.createProject"),
                    icon: faFolderPlus,
                    shortcut: "Ctrl + N",
                },
                {
                    path: RoutesPath.LIST_OF_PROJECTS,
                    text: t("portal:menu.listOfProjects"),
                    icon: faFolders,
                    shortcut: "Ctrl + P",
                }
            ]
        },
        {
            menu: t("portal:menu.customers"),
            submenu: [
                {
                    path: RoutesPath.CREATE_CUSTOMER,
                    text: t("portal:menu.createCustomer"),
                    icon: faSuitcase,
                    shortcut: "Ctrl + N",
                },
                {
                    path: RoutesPath.LIST_OF_CUSTOMERS,
                    text: t("portal:menu.listOfCustomers"),
                    icon: faBookUser,
                    shortcut: "Ctrl + P",
                }
            ]
        },
        {
            menu: t("portal:menu.users"),
            submenu: [
                {
                    path: RoutesPath.CREATE_USER,
                    text: t("portal:menu.createUser"),
                    icon: faUserPlus,
                    shortcut: "Ctrl + N",
                },
                {
                    path: RoutesPath.LIST_OF_USERS,
                    text: t("portal:menu.listOfUsers"),
                    icon: faUsers,
                    shortcut: "Ctrl + P",
                }
            ]
        },
        {
            menu: t("portal:menu.bin"),
            submenu: [
                {
                    path: RoutesPath.PROJECT_BIN,
                    text: t("portal:menu.projectBin"),
                    icon: faFolder,
                    shortcut: "Ctrl + N",
                },
                {
                    path: RoutesPath.JOB_BIN,
                    text: t("portal:menu.jobBin"),
                    icon: faHomeLgAlt,
                    shortcut: "Ctrl + P",
                }
            ]
        },
        {
            menu: t("portal:menu.settings"),
            submenu: [
                {
                    path: RoutesPath.SYSTEM,
                    text: t("portal:menu.system"),
                    icon: faCog,
                    shortcut: "Ctrl + N",
                },
                {
                    path: RoutesPath.ORGANIZATION,
                    text: t("portal:menu.organization"),
                    icon: faBuilding,
                    shortcut: "Ctrl + P",
                },
                {
                    path: RoutesPath.ABOUT_PROGRAM,
                    text: t("portal:menu.aboutProgram"),
                    icon: faBrowser,
                    shortcut: "Ctrl + P",
                }, {
                    path: RoutesPath.BACKUP,
                    text: t("portal:menu.backup"),
                    icon: faDatabase,
                    shortcut: "Ctrl + P",
                }
            ]
        }
    ];

    return (
        <header>
            <Nav list={menu}/>
        </header>
    )
}