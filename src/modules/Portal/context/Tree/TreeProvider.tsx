import { ReactNode, useState } from 'react';
import { useEffectAsync } from 'utils/useEffectAsync';

import { ProjectDtoPaginatedCollection } from '../../../../api/generated/api';
import API from '../../../../utils/api';
import { useApi } from '../../../../utils/hooks/useApi';
import { TreeContext } from './TreeContext';

//TODO selected elementy do local storage
export const TreeProvider = ( { children }: { children: ReactNode; } ) => {
    const [getProjects, { data, loading }] = useApi<undefined, ProjectDtoPaginatedCollection>();
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

    useEffectAsync( async () => {
        await getProjects( () => API.ProjectsApi.fineProjectManagerApiProjectsGet() );
    }, [] );

    const selectProject = ( id: string ) => {
        setSelectedProjectId( id );
    };

    return (
        <TreeContext.Provider value={{ projectTree: data ? data : emptyProjectTree, loadingProjectTree: loading, selectProject: selectProject }} >
            {children}
        </TreeContext.Provider> );
};