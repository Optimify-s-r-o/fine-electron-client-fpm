import { createContext, useContext } from 'react';

import { ApplicationDto } from '../../../../api/generated/api';

interface IApplicationsContextType {
    applications: ApplicationDto[];
    loading: boolean;
}

export const ApplicationContext = createContext<IApplicationsContextType>( {
    applications: [],
    loading: false
} );

export const useApplicationContext = () => useContext( ApplicationContext );