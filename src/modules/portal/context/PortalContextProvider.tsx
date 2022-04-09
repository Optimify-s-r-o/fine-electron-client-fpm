import { useAuthContext } from 'modules/auth/context/AuthContext';
import { ModalProvider } from 'utils/hooks/useModal';

import { ApplicationsProvider } from './Applications/ApplicationsProvider';
import { JobTranslationsProvider } from './JobTranslations/JobTranslationsProvider';
import { TreeProvider } from './Tree/TreeProvider';
import { SpotlightProvider } from './Spotlight/SpotlightProvider';
import { TabProvider } from './Tab/TabProvider';
import { ExecutableApplicationsProvider } from './ExecutableApplications/ExecutableApplicationsProvider';

export const PortalContextProvider = ( { children }: { children: JSX.Element; } ) => {
  const { isLogged } = useAuthContext();
  return isLogged ? (
    <JobTranslationsProvider>
      <ApplicationsProvider>
        <TreeProvider>
          <ExecutableApplicationsProvider>
            <ModalProvider>
              <SpotlightProvider>
                <TabProvider>
                  {children}
                </TabProvider>
              </SpotlightProvider>
            </ModalProvider>
          </ExecutableApplicationsProvider>
        </TreeProvider>
      </ApplicationsProvider >
    </JobTranslationsProvider>
  ) : (
    children
  );
};
