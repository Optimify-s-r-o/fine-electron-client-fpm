import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from 'modules/Auth/context/AuthProvider';
import { PortalContextProvider } from 'modules/Portal/context/PortalContextProvider';
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
