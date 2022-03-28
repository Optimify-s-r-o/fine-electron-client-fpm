import { RoutesPath } from 'constants/routes';
import { useAuthContext } from 'modules/Auth/context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const ProtectedRoute = ( { children }: { children: JSX.Element; } ) => {
    const { user, loading } = useAuthContext();
    const navigate = useNavigate();

    useEffect( () => {
        if ( !user && !loading && navigate ) {
            navigate( RoutesPath.SIGN_IN, { replace: true } );
        }
    }, [loading, user, navigate] );

    return children;
};