import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { config } from 'utils/api';
import { useApi } from 'utils/hooks/useApi';

import { SignInRequest, SignInResponse, UserDto } from '../../../api/generated/api';
import { RoutesPath } from '../../../constants/routes';
import API from '../../../utils/api';
import { AuthContext } from './AuthContext';

// TODO token do local storage
export const AuthProvider = ( { children }: { children: JSX.Element; } ) => {
  const [token, setToken] = useState<string | null>( null );
  const [user, setUser] = useState<UserDto | null>( null );
  const [validityEnd, setValidityEnd] = useState<Date | undefined>( undefined );
  const [isLoading, setIsLoading] = useState<boolean>( false );
  const [isLogged, setIsLogged] = useState<boolean>( user !== null );

  const [signIn, { loading: signInLoading }] = useApi<SignInResponse, SignInRequest>();
  const [fetchSelf, { loading: fetchLoading }] = useApi<UserDto>();
  const [loading, setLoading] = useState<boolean>( signInLoading || fetchLoading );

  const navigate = useNavigate();

  useEffect( () => {
    setLoading( signInLoading || fetchLoading );
  }, [signInLoading, fetchLoading] );

  const IsSavedTokenValid = async () => {
    const token = await window.API.keytarGetSecret( 'token' );
    const email = await window.API.keytarGetSecret( 'email' );

    if ( token === null || email === null ) return false;

    try {
      const result = await fetchSelf( () => API.UsersApi.fineProjectManagerApiUsersEmailGet( email ) );

      setUser( result );

      return true;
    } catch {
      await window.API.keytarDeleteSecret( 'token' );
      return false;
    }
  };

  const SignIn = async ( username: string, password: string ) => {
    setIsLoading( true );

    try {
      const result = await signIn( () =>
        API.UsersApi.fineProjectManagerApiUsersSignInPost( {
          email: username,
          password: password
        } )
      );

      await window.API.keytarSetSecret( 'token', result.token );

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

  const SignOut = async () => {
    setIsLoading( true );

    config.apiKey = '';
    setToken( null );
    setUser( null );
    setValidityEnd( undefined );
    await window.API.keytarDeleteSecret( 'token' );
    setIsLogged( false );

    setIsLoading( false );

    navigate( RoutesPath.SIGN_IN );
  };

  return (
    <AuthContext.Provider
      value={{
        isSavedTokenValid: IsSavedTokenValid,
        token: token,
        user: user,
        isLogged: isLogged,
        validityEnd: validityEnd,
        signIn: SignIn,
        signOut: SignOut,
        loading: loading || isLoading
      }}>
      {children}
    </AuthContext.Provider>
  );
};
