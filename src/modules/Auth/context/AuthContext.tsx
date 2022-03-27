import { createContext, useContext } from 'react';

import { UserDto } from '../../../api/generated/api';

interface IAuthContextType {
    token: string | null;
    user: UserDto | null;
    validityEnd: Date | undefined;

    signIn: ( username: string, password: string ) => Promise<boolean>;
    signOut: () => void;
    isLogged: boolean;
    loading: boolean;
}



export const AuthContext = createContext<IAuthContextType>( {
    token: null,
    user: null,
    validityEnd: undefined,
    signIn: async ( username: string, password: string ) => false,
    signOut: () => console.error( "no context" ),
    isLogged: false,
    loading: false
} );

export const useAuthContext = () => useContext( AuthContext );