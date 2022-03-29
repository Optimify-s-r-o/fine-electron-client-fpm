import { Menu } from './types';
import { useTranslation } from 'react-i18next';
import { RoutesPath } from '../../../../constants/routes';
import { Nav } from './components/Nav';
import {
  faCodeCompare,
  faCog,
  faFolderPlus,
  faUserPlus,
  faUsers
} from '@fortawesome/pro-duotone-svg-icons';

export const Navigation = () => {
  const { t } = useTranslation(['portal']);

  const menu: Menu[] = [
    {
      menu: t('portal:menu.projects'),
      submenu: [
        {
          path: RoutesPath.CREATE_PROJECT,
          text: t('portal:menu.createProject'),
          icon: faFolderPlus,
          shortcut: 'Ctrl + N'
        }
      ]
    },
    /*    {
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
        },*/
    {
      menu: t('portal:menu.users'),
      submenu: [
        {
          path: RoutesPath.CREATE_USER,
          text: t('portal:menu.createUser'),
          icon: faUserPlus,
          shortcut: 'Ctrl + N'
        },
        {
          path: RoutesPath.LIST_OF_USERS,
          text: t('portal:menu.listOfUsers'),
          icon: faUsers,
          shortcut: 'Ctrl + P'
        }
      ]
    },
    {
      menu: t('portal:menu.settings'),
      submenu: [
        {
          path: RoutesPath.SYSTEM,
          text: t('portal:menu.system'),
          icon: faCog,
          shortcut: 'Ctrl + N'
        },
        {
          path: RoutesPath.UPDATE,
          text: t('portal:menu.update'),
          icon: faCodeCompare,
          shortcut: 'Ctrl + P'
        }
      ]
    }
  ];

  return (
    <header>
      <Nav list={menu} />
    </header>
  );
};
