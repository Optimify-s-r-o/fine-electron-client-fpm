import { RoutesPath } from 'constants/routes';
import { useNavigate } from 'react-router';

import { useAuthContext } from 'modules/Auth/context/AuthContext';

export const ProtectedRoute = ( { children }: { children: JSX.Element; } ) => {
    const { user, loading } = useAuthContext();
    const navigate = useNavigate();

    //TODO KAREL takhle se to nedá dělat
    // je to ok pokud je prvni renderovani, ale problem nastane pri novem renderovani - (dej ctrl+R a pak nekam parkat prejdi) You should call navigate() in a React.useEffect(), not when your component is first rendered.
    // react_devtools_backend.js:3973 Warning: Cannot update a component (`BrowserRouter`) while rendering a different component (`ProtectedRoute`). To locate the bad setState() call inside `ProtectedRoute`, follow the stack trace as described
    if ( !user && !loading ) {
        navigate( RoutesPath.SIGN_IN, { replace: true } );
    }

    return children;
};