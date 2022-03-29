import { createContext, useContext } from 'react';

import { JobDto, ProjectDto, ProjectDtoPaginatedCollection } from '../../../../api/generated/api';

interface ITreeContextType {
    projectTree: ProjectDtoPaginatedCollection;
    jobTree: JobDto[];
    loadingProjectTree: boolean;
    loadingJobTree: boolean;
    selectedProjectId: string | null;
    selectedJobId: string | null;
    selectProject: ( id: string ) => void;
    selectJob: ( id: string ) => void;
    handleNewProject: ( project: ProjectDto ) => Promise<void>;
}



export const TreeContext = createContext<ITreeContextType>( {
    projectTree: {},
    jobTree: [],
    loadingProjectTree: false,
    loadingJobTree: false,
    selectedProjectId: null,
    selectedJobId: null,
    selectProject: () => console.log( 'No valid context' ),
    selectJob: () => console.log( 'No valid context' ),
    handleNewProject: () => new Promise<void>( e => 'No valid context' ),
} );

export const useTreeContext = () => useContext( TreeContext );