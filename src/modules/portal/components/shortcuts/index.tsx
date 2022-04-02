import { useShortcuts } from '../../../../utils/keyHandler/useShortcuts';
import { RoutesPath } from '../../../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../auth/context/AuthContext';

export const useShortcutWrapper = () => {
  const navigate = useNavigate();
  const { signOut } = useAuthContext();

  const handleKeyPress = (path: RoutesPath) => (event: any) => {
    navigate(path);
  };

  //TODO
  const openQuickSearch = () => {};

  useShortcuts('KeyP', handleKeyPress(RoutesPath.CREATE_PROJECT));
  useShortcuts('KeyE', handleKeyPress(RoutesPath.CREATE_USER));
  useShortcuts('KeyT', handleKeyPress(RoutesPath.LIST_OF_USERS));
  useShortcuts('KeyK', handleKeyPress(RoutesPath.LOCAL_APPLICATIONS_SETTINGS));
  useShortcuts('KeyU', handleKeyPress(RoutesPath.UPDATE));
  useShortcuts('KeyQ', handleKeyPress(RoutesPath.ADMIN_APPLICATIONS_SETTINGS));
  useShortcuts('KeyD', handleKeyPress(RoutesPath.ADMIN_JOBS_SETTINGS));
  useShortcuts('KeyO', (_event) => signOut());
  useShortcuts('KeyF', (_event) => openQuickSearch());
};
