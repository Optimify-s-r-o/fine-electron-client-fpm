import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from 'modules/auth/context/AuthProvider';
import { PortalContextProvider } from 'modules/portal/context/PortalContextProvider';
import { Root } from 'Root';

const App = () => {
  return (
    <AuthProvider>
      <PortalContextProvider>
        <Root />
      </PortalContextProvider>
    </AuthProvider>
  );
};

export default App;
