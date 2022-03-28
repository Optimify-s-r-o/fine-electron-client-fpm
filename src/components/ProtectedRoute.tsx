import { RoutesPath } from 'constants/routes';
import { useNavigate } from 'react-router';

import { useAuthContext } from '../modules/Auth/context/AuthContext';

export const ProtectedRoute = ( { children }: { children: JSX.Element; } ) => {
    const { user, loading } = useAuthContext();
    const navigate = useNavigate();

    if ( !user && !loading ) {
        navigate( RoutesPath.SIGN_IN, { replace: true } );
    }

    return children;
};