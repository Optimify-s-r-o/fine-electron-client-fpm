import 'react-toastify/dist/ReactToastify.css';

import {AuthProvider} from 'modules/Auth/context/AuthProvider';
import {PortalContextProvider} from 'modules/portal/context/PortalContextProvider';
import {Root} from 'Root';
import {
    ExecutableApplicationsProvider
} from "./modules/portal/context/ExecutableApplications/ExecutableApplicationsProvider";

const App = () => {

    return (
        <AuthProvider>
            <PortalContextProvider>
                <ExecutableApplicationsProvider>
                    <Root/>
                </ExecutableApplicationsProvider>
            </PortalContextProvider>
        </AuthProvider>
    );
};

export default App;
