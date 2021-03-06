import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { config } from 'utils/api';
import { useApi } from 'utils/hooks/useApi';

import { SignInRequest, SignInResponse, UserDto } from '../../../api/generated/api';
import { RoutesPath } from '../../../constants/routes';
import API from '../../../utils/api';
import { AuthContext } from './AuthContext';

// TODO token do local storage
export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserDto | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [validityEnd, setValidityEnd] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(user !== null);

  const [signIn, { loading: signInLoading }] = useApi<SignInResponse, SignInRequest>();
  const [fetchSelf, { loading: fetchLoading }] = useApi<UserDto>();
  const [loading, setLoading] = useState<boolean>(signInLoading || fetchLoading);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(signInLoading || fetchLoading);
  }, [signInLoading, fetchLoading]);

  const IsSavedTokenValid = async () => {
    const token = await window.API.keytarGetSecret('token');
    const email = await window.API.keytarGetSecret('email');
    const validityEnd = await window.API.keytarGetSecret('tokenValidity');

    if (token === null || email === null || validityEnd === null) return false;

    const validityEndDate = new Date(validityEnd);

    if (validityEndDate <= new Date()) return false;

    try {
      config.apiKey = 'Bearer ' + token;
      const result = await fetchSelf(() => API.UsersApi.fineProjectManagerApiUsersEmailGet(email));

      setToken(token);
      saveUser(result);
      setValidityEnd(validityEndDate);
      setIsLogged(true);
      setIsLoading(false);

      return true;
    } catch {
      await window.API.keytarDeleteSecret('token');
      return false;
    }
  };

  const SignIn = async (username: string, password: string) => {
    setIsLoading(true);

    try {
      const result = await signIn(() =>
        API.UsersApi.fineProjectManagerApiUsersSignInPost({
          email: username,
          password: password
        })
      );

      await window.API.keytarSetSecret('token', result.token);
      await window.API.keytarSetSecret('tokenValidity', result.expiration);

      config.apiKey = 'Bearer ' + result.token;
      setToken(result.token as string);
      saveUser(result.user as UserDto);
      setValidityEnd(new Date(result.expiration as string));
      setIsLogged(true);
      setIsLoading(false);

      return true;
    } catch (e) {
      setIsLoading(false);
      return false;
    }
  };

  const saveUser = (u: UserDto | null) => {
    setUser(u);

    if (u && u.userRoles.some((e) => e === 'ADMIN' || e === 'EXTERNAL_OPERATOR')) {
      setIsAdmin(true);
    }
  };

  const SignOut = async () => {
    setIsLoading(true);

    config.apiKey = '';
    setToken(null);
    saveUser(null);
    setValidityEnd(undefined);
    await window.API.keytarDeleteSecret('token');
    await window.API.keytarDeleteSecret('tokenValidity');
    setIsLogged(false);

    setIsLoading(false);

    navigate(RoutesPath.SIGN_IN);
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
        isAdmin: isAdmin,
        loading: loading || isLoading
      }}>
      {children}
    </AuthContext.Provider>
  );
};
