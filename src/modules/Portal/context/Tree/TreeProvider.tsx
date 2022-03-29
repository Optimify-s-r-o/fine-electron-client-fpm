import { useAuthContext } from 'modules/Auth/context/AuthContext';
import { ReactNode, useEffect, useState } from 'react';

import { ProjectDtoPaginatedCollection } from '../../../../api/generated/api';
import API from '../../../../utils/api';
import { useApi } from '../../../../utils/hooks/useApi';
import { TreeContext } from './TreeContext';

//TODO selected elementy do local storage
export const TreeProvider = ( { children }: { children: JSX.Element; } ) => {
    const { user, isLogged, loading: userLoading } = useAuthContext();
    const [getProjects, { data: projectData, loading: projectsLoading }] = useApi<undefined, ProjectDtoPaginatedCollection>();
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>( null );

    //Todo nastaveni stromu v local storage
    const requestedPageSize = 25;
    const page = 0;
    const filter = '';
    const sort = '';

    const emptyProjectTree: ProjectDtoPaginatedCollection = {
        data: [],
        page: page,
        pageSize: requestedPageSize,
        requestedPageSize: requestedPageSize,
        totalRecords: 0,
        totalPages: 1,
        filter: filter,
        sort: sort,
        nextPageExists: false,
        previousPageExists: false
    };

    useEffect( () => {
        if ( isLogged && !userLoading ) {
            getProjects( () => API.ProjectsApi.fineProjectManagerApiProjectsGet( filter, sort, page, requestedPageSize ) );
        }
    }, [user, userLoading] );

    const selectProject = ( id: string ) => {
        setSelectedProjectId( id );
    };

    return (
        <TreeContext.Provider value={{ projectTree: projectData ? projectData : emptyProjectTree, loadingProjectTree: projectsLoading, selectProject: selectProject }} >
            {children}
        </TreeContext.Provider> );
};