import { useAuthContext } from 'modules/auth/context/AuthContext';

import { ApplicationsProvider } from './Applications/ApplicationsProvider';
import { JobTranslationsProvider } from './JobTranslations/JobTranslationsProvider';
import { TreeProvider } from './Tree/TreeProvider';

export const PortalContextProvider = ( { children }: { children: JSX.Element; } ) => {
  const { isLogged } = useAuthContext();
  return isLogged ? (
    <JobTranslationsProvider>
      <ApplicationsProvider>
        <TreeProvider>
          {children}
        </TreeProvider>
      </ApplicationsProvider >
    </JobTranslationsProvider>
  ) : (
    children
  );
};
