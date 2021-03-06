import {
  faCodeCompare,
  faCog,
  faFolderPlus,
  faUserPlus,
  faUsers,
  faBarsProgress,
  faBrowser
} from '@fortawesome/pro-duotone-svg-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEffectAsync } from 'utils/useEffectAsync';

import { RoutesPath } from '../../../../constants/routes';
import { useAuthContext } from '../../../auth/context/AuthContext';
import { Nav } from './components/Nav';
import { Menu } from './types';

export const Navigation = () => {
  const { t } = useTranslation(['portal']);
  const { user, loading, isLogged, signOut, isAdmin } = useAuthContext();

  const [menuItems, setMenuItems] = useState<Menu[]>([
    {
      id: 'projects',
      menu: t('portal:menu.projects'),
      submenu: [
        {
          path: RoutesPath.CREATE_PROJECT,
          text: t('portal:menu.createProject'),
          icon: faFolderPlus,
          shortcut: 'Ctrl + P'
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
      id: 'users',
      menu: t('portal:menu.users'),
      submenu: [
        {
          path: RoutesPath.CREATE_USER,
          text: t('portal:menu.createUser'),
          icon: faUserPlus,
          shortcut: 'Ctrl + E'
        },
        {
          path: RoutesPath.LIST_OF_USERS,
          text: t('portal:menu.listOfUsers'),
          icon: faUsers,
          shortcut: 'Ctrl + T'
        }
      ]
    },
    {
      id: 'settings',
      menu: t('portal:menu.settings'),
      submenu: [
        {
          path: RoutesPath.LOCAL_APPLICATIONS_SETTINGS,
          text: t('portal:menu.applications'),
          icon: faCog,
          shortcut: 'Ctrl + K'
        },
        {
          path: RoutesPath.UPDATE,
          text: t('portal:menu.update'),
          icon: faCodeCompare,
          shortcut: 'Ctrl + U'
        }
      ]
    },
    {
      id: 'signOut',
      menu: t('portal:menu.signOut'),
      customClick: () => signOut()
    }
  ]);

  useEffectAsync(() => {
    if (user && isLogged && !loading && isAdmin && !menuItems.some((e) => e.id === 'admin')) {
      const newSettings = [
        ...menuItems.filter((e) => e.id !== 'signOut'),
        {
          id: 'admin',
          menu: t('portal:menu.admin'),
          submenu: [
            {
              path: RoutesPath.ADMIN_APPLICATIONS_SETTINGS,
              text: t('portal:menu.adminSettings'),
              icon: faBrowser,
              shortcut: 'Ctrl + Q'
            },
            {
              path: RoutesPath.ADMIN_JOBS_SETTINGS,
              text: t('portal:menu.jobsSettings'),
              icon: faBarsProgress,
              shortcut: 'Ctrl + D'
            }
          ]
        },
        {
          id: 'signOut',
          menu: t('portal:menu.signOut'),
          customClick: () => signOut()
        }
      ];
      setMenuItems(newSettings);
    }
  }, [user, loading, isLogged]);

  return (
    <header>
      <Nav list={menuItems} />
    </header>
  );
};
