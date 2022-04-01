import { createContext, useContext } from 'react';

import { UserDto } from '../../../api/generated/api';

interface IAuthContextType {
  token: string | null;
  user: UserDto | null;
  validityEnd: Date | undefined;

  isSavedTokenValid: () => Promise<boolean>;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => void;
  isAdmin: boolean;
  isLogged: boolean;
  loading: boolean;
}

export const AuthContext = createContext<IAuthContextType>({
  token: null,
  user: null,
  validityEnd: undefined,
  isSavedTokenValid: async () => false,
  signIn: async (username: string, password: string) => false,
  signOut: () => console.error('no context'),
  isAdmin: false,
  isLogged: false,
  loading: false
});

export const useAuthContext = () => useContext(AuthContext);
