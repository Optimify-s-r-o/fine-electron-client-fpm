import { createContext, useContext } from 'react';

import { ProjectDtoPaginatedCollection } from '../../../../api/generated/api';

interface ITreeContextType {
    projectTree: ProjectDtoPaginatedCollection;
    loadingProjectTree: boolean;

    selectProject: ( id: string ) => void;
}



export const TreeContext = createContext<ITreeContextType>( {
    projectTree: {},
    loadingProjectTree: false,
    selectProject: () => console.log( 'No valid context' )
} );

export const useTreeContextType = () => useContext( TreeContext );