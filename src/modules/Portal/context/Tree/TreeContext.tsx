import { createContext, useContext } from 'react';

import { ProjectDtoPaginatedCollection } from '../../../../api/generated/api';

interface ITreeContextType {
    projectTree: ProjectDtoPaginatedCollection;
    loadingProjectTree: boolean;
    selectedProjectId: string | null;

    selectProject: ( id: string ) => void;
}



export const TreeContext = createContext<ITreeContextType>( {
    projectTree: {},
    loadingProjectTree: false,
    selectedProjectId: null,
    selectProject: () => console.log( 'No valid context' )
} );

export const useTreeContext = () => useContext( TreeContext );