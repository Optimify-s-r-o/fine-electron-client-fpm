import { ReactNode, useState } from 'react';
import { config } from 'utils/api';
import { useApi } from 'utils/hooks/useApi';

import { SignInRequest, SignInResponse, UserDto } from '../../../api/generated/api';
import API from '../../../utils/api';
import { AuthContext } from './AuthContext';

// TODO potreba vyresit ztratu tokenu pri refreshi - dej ctrl+R a pak uvidis 401 nad getem nad stromem
//TODO je tam nejaky problem s loadingem. Kdyz das spatny email + heslo tak se porad toci kolecko, ale koukal jsem a useApi sem pak hodi loading false
export const AuthProvider = ( { children }: { children: ReactNode; } ) => {
    const [token, setToken] = useState<string | null>( null );
    const [user, setUser] = useState<UserDto | null>( null );
    const [validityEnd, setValidityEnd] = useState<Date | undefined>( undefined );
    const [isLoading, setIsLoading] = useState<boolean>( false );

    const [signIn, { loading }] = useApi<SignInRequest, SignInResponse>();

    const SignIn = async ( username: string, password: string ) => {
        setIsLoading( true );

        const result = await signIn( () => API.UsersApi.fineProjectManagerApiUsersSignInPost( {
            email: username,
            password: password
        } ) );

        if ( !result.isAuthenticated ) {
            setIsLoading( false );
            return false;
        }

        config.apiKey = 'Bearer ' + result.token;
        setToken( result.token as string );
        setUser( result.user as UserDto );
        setValidityEnd( new Date( result.expiration as string ) );

        setIsLoading( false );

        return true;
    };

    const SignOut = () => {
        setIsLoading( true );

        config.apiKey = '';
        setToken( null );
        setUser( null );
        setValidityEnd( undefined );

        setIsLoading( false );
    };

    return (
        <AuthContext.Provider value={{ token: token, user: user, isLogged: user !== null, validityEnd: validityEnd, signIn: SignIn, signOut: SignOut, loading: loading || isLoading }} >
            {children}
        </AuthContext.Provider> );
};