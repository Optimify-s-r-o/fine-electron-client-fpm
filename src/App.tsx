import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from 'modules/Auth/context/AuthProvider';
import { PortalContextProvider } from 'modules/portal/context/PortalContextProvider';
import { Root } from 'Root';
import { ExecutableApplicationsProvider } from './modules/portal/context/ExecutableApplications/ExecutableApplicationsProvider';
import { ModalProvider } from 'utils/hooks/useModal';

const App = () => {
  return (
    <AuthProvider>
      <PortalContextProvider>
        <ExecutableApplicationsProvider>
          <ModalProvider>
            <Root />
          </ModalProvider>
        </ExecutableApplicationsProvider>
      </PortalContextProvider>
    </AuthProvider>
  );
};

export default App;
