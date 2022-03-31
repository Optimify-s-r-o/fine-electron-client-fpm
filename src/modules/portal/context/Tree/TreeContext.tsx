import { createContext, useContext } from 'react';

import { JobDto, ProjectDto, ProjectDtoPaginatedCollection } from '../../../../api/generated/api';

interface ITreeContextType {
  projectTree: ProjectDtoPaginatedCollection;
  jobTree: JobDto[];
  loadingProjectTree: boolean;
  loadingJobTree: boolean;
  selectedProjectId: string | null;
  selectedJobId: string | null;
  selectProject: (project: ProjectDto) => void;
  selectJob: (id: string) => void;
  handleNewProject: (project: ProjectDto) => Promise<void>;
  refetch: () => Promise<ProjectDtoPaginatedCollection>;
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
  refetch: () => new Promise<ProjectDtoPaginatedCollection>((e) => 'No valid context')
});

export const useTreeContext = () => useContext(TreeContext);
