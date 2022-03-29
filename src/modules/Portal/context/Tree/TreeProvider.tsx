import { JobDto, ProjectDto, ProjectDtoPaginatedCollection } from 'api/generated/api';
import { useAuthContext } from 'modules/Auth/context/AuthContext';
import { useState } from 'react';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import { useEffectAsync } from 'utils/useEffectAsync';

import { ProjectJobsDto } from '../../../../api/generated/api';
import { TreeContext } from './TreeContext';

//TODO selected elementy do local storage
export const TreeProvider = ( { children }: { children: JSX.Element; } ) => {
    const { user, isLogged, loading: userLoading } = useAuthContext();
    const [getProjects, { loading: projectsLoading }] = useApi<ProjectDtoPaginatedCollection>();
    const [getJobs, { loading: jobsLoading }] = useApi<ProjectJobsDto>();

    const [jobsData, setJobsData] = useState<JobDto[]>( [] );

    const [selectedProjectId, setSelectedProjectId] = useState<string | null>( null );
    const [selectedJobId, setSelectedJobId] = useState<string | null>( null );

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

    const [projectsData, setProjectsData] = useState<ProjectDtoPaginatedCollection>( emptyProjectTree );

    // Fetch project tree during portal startup
    useEffectAsync( async () => {
        if ( isLogged && !userLoading ) {
            const res = await getProjects( () => API.ProjectsApi.fineProjectManagerApiProjectsGet( filter, sort, page, requestedPageSize ) );
            setProjectsData( res );
        }
    }, [isLogged, user, userLoading] );

    // Fetch job tree if project is selected
    // Clear job selection if no project is selected
    // Clear job tree if no project is selected
    useEffectAsync( async () => {
        if ( isLogged && !userLoading && selectedProjectId ) {

            setSelectedJobId( null );
            const res = await getJobs( () => API.ProjectsApi.fineProjectManagerApiProjectsIdJobsGet( selectedProjectId ) );
            setJobsData( res.jobs );
        } else {
            setSelectedJobId( null );
            setJobsData( [] );
        }
    }, [isLogged, user, userLoading, selectedProjectId] );

    const selectProject = ( id: string ) => {
        setSelectedProjectId( id );
    };

    const selectJob = ( id: string ) => {
        setSelectedJobId( id );
    };

    const handleNewProject = async ( project: ProjectDto ) => {
        const newTree = { ...projectsData };
        newTree.data = [project, ...newTree.data as ProjectDto[]];

        setProjectsData( newTree );
        setSelectedProjectId( project.id );
    };

    return (
        <TreeContext.Provider value={{
            projectTree: projectsData,
            jobTree: jobsData,
            loadingProjectTree: projectsLoading,
            loadingJobTree: jobsLoading,
            selectProject: selectProject,
            selectJob: selectJob,
            selectedProjectId: selectedProjectId,
            selectedJobId: selectedJobId,
            handleNewProject: handleNewProject
        }}>
            {children}
        </TreeContext.Provider> );
};