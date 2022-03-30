import { RoutesPath } from '../../../../constants/routes';

export type Menu = {
  menu: string;
  customClick?: () => void;
  submenu?: Submenu[];
};

export type Submenu = {
  path: RoutesPath;
  text: string;
  icon: any;
  shortcut: string;
  newWindow?: boolean;
};
