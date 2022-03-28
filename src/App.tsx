import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from 'modules/Auth/context/AuthProvider';
import { Root } from 'Root';

const App = () => {
    return (
        <AuthProvider>
            <Root />
        </AuthProvider>
    );
};

export default App;
