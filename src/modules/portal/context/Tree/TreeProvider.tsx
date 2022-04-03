import { JobDto, ProjectDto, ProjectDtoPaginatedCollection } from 'api/generated/api';
import { RoutesPath } from 'constants/routes';
import { useAuthContext } from 'modules/auth/context/AuthContext';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import { objectToQueryString } from 'utils/query/query';
import { useEffectAsync } from 'utils/useEffectAsync';

import { ProjectJobsDto } from '../../../../api/generated/api';
import { TreeContext } from './TreeContext';
import { ProjectTreeQuery, ProjectTreeSort } from './types';

//TODO selected elementy do local storage
export const TreeProvider = ({ children }: { children: JSX.Element }) => {
  const { user, isLogged, loading: userLoading } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [getProjects, { loading: projectsLoading }] = useApi<ProjectDtoPaginatedCollection>();
  const [getJobs, { loading: jobsLoading }] = useApi<ProjectJobsDto>();

  const [getProjectById] = useApi<ProjectDto>();
  const [getJobById] = useApi<JobDto>();

  const [jobsData, setJobsData] = useState<JobDto[]>([]);

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobDto | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectDto | null>(null);

  // Filter, sort and pagination settings
  const [requestedPageSize, setRequestedPageSize] = useState<number>(50);
  const [requestedPage, setRequestedPage] = useState<number>(0);
  const [projectTreeQuery, setProjectTreeQuery] = useState<ProjectTreeQuery>({
    favoriteOnly: undefined,
    name: undefined
  });
  const [projectTreeSort, setProjectTreeSort] = useState<ProjectTreeSort>(
    ProjectTreeSort.modifyDateAsc
  );

  const emptyProjectTree: ProjectDtoPaginatedCollection = {
    data: [],
    page: requestedPage,
    pageSize: requestedPageSize,
    requestedPageSize: requestedPageSize,
    totalRecords: 0,
    totalPages: 1,
    filter: '',
    sort: '',
    nextPageExists: false,
    previousPageExists: false
  };

  const [projectsData, setProjectsData] = useState<ProjectDtoPaginatedCollection>(emptyProjectTree);

  // Refetch when state change
  useEffectAsync(async () => {
    await refetchProjects();
  }, [projectTreeSort, projectTreeQuery, requestedPage]);

  // Filters
  const resetFilters = () => {
    setProjectTreeQuery({ favoriteOnly: false, name: '' });
  };

  const setFavoriteOnlyFilter = (favoriteOnly: boolean) => {
    setProjectTreeQuery((e) => ({
      ...e,
      favoriteOnly: favoriteOnly ? favoriteOnly : undefined
    }));
  };

  const setNameFilter = (name: string) => {
    setProjectTreeQuery((e) => ({
      ...e,
      name: name
    }));
  };

  const setSort = (sort: ProjectTreeSort) => {
    setProjectTreeSort(sort);
  };

  const setPage = (page: number) => {
    setRequestedPage(page);
  };

  // Fetch project tree during portal startup
  useEffectAsync(async () => {
    if (isLogged && !userLoading) {
      const res = await refetchProjects();
      setProjectsData(res);
    }
  }, [isLogged, user, userLoading]);

  // Fetch job tree if project is selected
  // Clear job selection if no project is selected
  // Clear job tree if no project is selected
  useEffectAsync(async () => {
    if (isLogged && !userLoading && selectedProjectId) {
      setSelectedJobId(null);
      const res = await refetchJobs();
      res?.jobs && setJobsData(res?.jobs);
    } else {
      setSelectedJobId(null);
      setJobsData([]);
    }
  }, [isLogged, user, userLoading, selectedProjectId]);

  const refetchProjects = async () => {
    const res = await getProjects(() =>
      API.ProjectsApi.fineProjectManagerApiProjectsGet(
        objectToQueryString(projectTreeQuery),
        objectToQueryString(projectTreeSort),
        requestedPage,
        requestedPageSize
      )
    );
    setProjectsData(res);
    setIsFiltered(projectTreeQuery.name !== '' && projectTreeQuery.name !== undefined);
    return res;
  };

  const refetchJobs = async () => {
    if (!selectedProjectId) return;

    return await getJobs(() =>
      API.ProjectsApi.fineProjectManagerApiProjectsIdJobsGet(selectedProjectId)
    );
  };

  const selectProject = (project: ProjectDto) => {
    setSelectedProjectId(project.id);
    setSelectedJobId(null);
    setSelectedJob(null);
    setSelectedProject(project);
    navigate(`${RoutesPath.PROJECTS}/${project.id}/${project.name}/general`);
  };

  // Deselect project item if location changed outside project scope
  useEffect(() => {
    if (
      (!location.pathname.startsWith(RoutesPath.PROJECTS) &&
        !location.pathname.startsWith(RoutesPath.JOBS)) ||
      location.pathname === RoutesPath.CREATE_PROJECT
    ) {
      setSelectedProjectId(null);
    }
  }, [location]);

  // Deselect job item if location changed outside job scope
  useEffect(() => {
    if (!location.pathname.startsWith(RoutesPath.JOBS)) {
      setSelectedJobId(null);
    }
  }, [location]);

  const selectJob = (job: JobDto) => {
    setSelectedProjectId(job.projectId);
    setSelectedJobId(job.id);
    setSelectedProject(null);
    setSelectedJob(job);
    navigate(`${RoutesPath.JOBS}/${job.id}/general`);
  };

  const selectJobIdOnly = async ( id: string ) => {
    const res = await getJobById( () => API.JobsApi.fineProjectManagerApiJobsIdGet( id ) );
    setSelectedProjectId( res.projectId );
    selectJob( res );
  }

  const selectProjectIdOnly = async ( id: string ) => {
    const res = await getProjectById( () => API.ProjectsApi.fineProjectManagerApiProjectsIdGet( id ) );
    selectProject( res );
  }

  // Push project to current tree
  const handleNewProject = async (project: ProjectDto) => {
    const newTree = { ...projectsData };
    newTree.data = [project, ...(newTree.data as ProjectDto[])];

    setProjectsData(newTree);
    selectProject(project);
  };

  const toggleProjectFavorite = async (project: ProjectDto) => {
    const newTree = { ...projectsData };
    const projectIndex = newTree.data.findIndex((val: ProjectDto) => val.id === project.id);
    newTree.data[projectIndex].isFavorite = !newTree.data[projectIndex].isFavorite;

    setProjectsData(newTree);
  };

  return (
    <TreeContext.Provider
      value={{
        projectTree: projectsData,
        jobTree: jobsData,
        loadingProjectTree: projectsLoading,
        loadingJobTree: jobsLoading,
        selectProject: selectProject,
        selectJob: selectJob,
        selectedProjectId: selectedProjectId,
        selectedJobId: selectedJobId,
        handleNewProject: handleNewProject,
        refetchProjects: refetchProjects,
        refetchJobs: refetchJobs,
        toggleProjectFavorite: toggleProjectFavorite,
        isFiltered,
        setFavoritesOnlyFilter: setFavoriteOnlyFilter,
        setNameFilter: setNameFilter,
        setSort: setSort,
        setPage: setPage,
        setRequestedPageSize: setRequestedPageSize,
        filterQuery: projectTreeQuery,
        resetFilters: resetFilters,
        selectedJob: selectedJob,
        selectedProject: selectedProject,
        selectJobIdOnly: selectJobIdOnly,
        selectProjectIdOnly: selectProjectIdOnly
      }}>
      {children}
    </TreeContext.Provider>
  );
};
