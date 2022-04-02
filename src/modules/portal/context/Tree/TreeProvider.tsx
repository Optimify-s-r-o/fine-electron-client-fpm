import { JobDto, ProjectDto, ProjectDtoPaginatedCollection } from 'api/generated/api';
import { RoutesPath } from 'constants/routes';
import { useAuthContext } from 'modules/auth/context/AuthContext';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import { useEffectAsync } from 'utils/useEffectAsync';

import { ProjectJobsDto } from '../../../../api/generated/api';
import { TreeContext } from './TreeContext';

//TODO selected elementy do local storage
export const TreeProvider = ({ children }: { children: JSX.Element }) => {
  const { user, isLogged, loading: userLoading } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [getProjects, { loading: projectsLoading }] = useApi<ProjectDtoPaginatedCollection>();
  const [getJobs, { loading: jobsLoading }] = useApi<ProjectJobsDto>();

  const [jobsData, setJobsData] = useState<JobDto[]>([]);

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  //Ulozeni nastaveni stromu
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

  const [projectsData, setProjectsData] = useState<ProjectDtoPaginatedCollection>(emptyProjectTree);

  // Fetch project tree during portal startup
  useEffectAsync(async () => {
    if (isLogged && !userLoading) {
      const res = await refetchProjects();
      setIsFiltered(false);
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

  const refetchProjects = async (favoriteOnly: boolean = false) => {
    const res = await getProjects(() =>
      API.ProjectsApi.fineProjectManagerApiProjectsGet(
        favoriteOnly ? 'FavoriteOnly=true' + (filter.length > 0 ? '&' + filter : '') : filter,
        sort,
        page,
        requestedPageSize
      )
    );
    setIsFiltered(false);
    setProjectsData(res);
    return res;
  };

  const queryProjects = async (query: string) => {
    const res = await getProjects(() => API.ProjectsApi.fineProjectManagerApiProjectsGet(query));

    setProjectsData(res);
    setIsFiltered(true);
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
    setSelectedJobId(job.id);
    navigate(`${RoutesPath.JOBS}/${job.id}/${job.name}/general`);
  };

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
        queryProjects: queryProjects,
        toggleProjectFavorite: toggleProjectFavorite,
        isFiltered
      }}>
      {children}
    </TreeContext.Provider>
  );
};
