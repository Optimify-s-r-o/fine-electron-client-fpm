import { useState } from 'react';
import { config } from 'utils/api';
import { useApi } from 'utils/hooks/useApi';

import { SignInRequest, SignInResponse, UserDto } from '../../../api/generated/api';
import API from '../../../utils/api';
import { AuthContext } from './AuthContext';

// TODO token do local storage
export const AuthProvider = ( { children }: { children: JSX.Element; } ) => {
    const [token, setToken] = useState<string | null>( null );
    const [user, setUser] = useState<UserDto | null>( null );
    const [validityEnd, setValidityEnd] = useState<Date | undefined>( undefined );
    const [isLoading, setIsLoading] = useState<boolean>( false );
    const [isLogged, setIsLogged] = useState<boolean>( user !== null );

    const [signIn, { loading }] = useApi<SignInRequest, SignInResponse>();

    const SignIn = async ( username: string, password: string ) => {
        setIsLoading( true );

        try {
            const result = await signIn( () => API.UsersApi.fineProjectManagerApiUsersSignInPost( {
                email: username,
                password: password
            } ) );

            console.log( JSON.stringify( result ) );

            config.apiKey = 'Bearer ' + result.token;
            setToken( result.token as string );
            setUser( result.user as UserDto );
            setValidityEnd( new Date( result.expiration as string ) );
            setIsLogged( true );

            setIsLoading( false );
            return true;
        } catch ( e ) {
            setIsLoading( false );
            return false;
        }


    };

    const SignOut = () => {
        setIsLoading( true );

        config.apiKey = '';
        setToken( null );
        setUser( null );
        setValidityEnd( undefined );
        setIsLogged( false );

        setIsLoading( false );
    };

    return (
        <AuthContext.Provider value={{ token: token, user: user, isLogged: isLogged, validityEnd: validityEnd, signIn: SignIn, signOut: SignOut, loading: loading || isLoading }} >
            {children}
        </AuthContext.Provider> );
};