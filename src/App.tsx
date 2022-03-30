import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from 'modules/auth/context/AuthProvider';
import { PortalContextProvider } from 'modules/portal/context/PortalContextProvider';
import { Root } from 'Root';
import { ExecutableApplicationsProvider } from './modules/portal/context/ExecutableApplications/ExecutableApplicationsProvider';
import { ModalProvider } from 'utils/hooks/useModal';
import { TabProvider } from './modules/portal/context/Tab/TabProvider';

const App = () => {
  return (
    <AuthProvider>
      <PortalContextProvider>
        <ExecutableApplicationsProvider>
          <ModalProvider>
            <TabProvider>
              <Root />
            </TabProvider>
          </ModalProvider>
        </ExecutableApplicationsProvider>
      </PortalContextProvider>
    </AuthProvider>
  );
};

export default App;
