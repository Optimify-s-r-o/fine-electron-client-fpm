import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from 'modules/Auth/context/AuthProvider';
import { PortalContextProvider } from 'modules/Portal/context/PortalContextProvider';
import { Root } from 'Root';

import { useAuthContext } from './modules/Auth/context/AuthContext';

const App = () => {
    const { isLogged } = useAuthContext();

    return (
        <AuthProvider>
            {
                isLogged ?
                    <PortalContextProvider >
                        <Root />
                    </PortalContextProvider>
                    :
                    < Root />
            }

        </AuthProvider>
    );
};

export default App;
