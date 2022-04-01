import { createContext, useContext } from 'react';

import {
  JobDto,
  ProjectDto,
  ProjectDtoPaginatedCollection,
  ProjectJobsDto
} from '../../../../api/generated/api';

interface ITreeContextType {
  projectTree: ProjectDtoPaginatedCollection;
  jobTree: JobDto[];
  loadingProjectTree: boolean;
  loadingJobTree: boolean;
  selectedProjectId: string | null;
  selectedJobId: string | null;
  selectProject: (project: ProjectDto) => void;
  selectJob: (id: JobDto) => void;
  handleNewProject: (project: ProjectDto) => Promise<void>;
  refetchProjects: () => Promise<ProjectDtoPaginatedCollection | undefined>;
  refetchJobs: () => Promise<ProjectJobsDto | undefined>;
  toggleProjectFavorite: (project: ProjectDto) => Promise<void>;
}

export const TreeContext = createContext<ITreeContextType>({
  projectTree: {
    data: [],
    page: 0,
    pageSize: 0,
    requestedPageSize: 0,
    filter: '',
    totalRecords: 0,
    totalPages: 0,
    sort: '',
    nextPageExists: false,
    previousPageExists: false
  },
  jobTree: [],
  loadingProjectTree: false,
  loadingJobTree: false,
  selectedProjectId: null,
  selectedJobId: null,
  selectProject: () => console.log('No valid context'),
  selectJob: () => console.log('No valid context'),
  handleNewProject: () => new Promise<void>((e) => 'No valid context'),
  refetchProjects: () => new Promise<ProjectDtoPaginatedCollection>((e) => 'No valid context'),
  refetchJobs: () => new Promise<ProjectJobsDto>((e) => 'No valid context'),
  toggleProjectFavorite: () => new Promise<void>((e) => 'No valid context')
});

export const useTreeContext = () => useContext(TreeContext);
