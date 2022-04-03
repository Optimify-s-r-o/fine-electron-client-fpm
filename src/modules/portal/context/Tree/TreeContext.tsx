import { createContext, useContext } from 'react';

import { JobDto, ProjectDto, ProjectDtoPaginatedCollection, ProjectJobsDto } from '../../../../api/generated/api';
import { ProjectTreeQuery, ProjectTreeSort } from './types';

interface ITreeContextType {
  projectTree: ProjectDtoPaginatedCollection;
  jobTree: JobDto[];
  loadingProjectTree: boolean;
  loadingJobTree: boolean;
  isFiltered: boolean;
  selectedProjectId: string | null;
  selectedJobId: string | null;
  setFavoritesOnlyFilter: ( favoritesOnly: boolean ) => void;
  setNameFilter: ( name: string) => void;
  setSort: ( sort: ProjectTreeSort) => void;
  setPage: ( sort: number) => void;
  setRequestedPageSize: ( sort: number) => void;
  selectProject: (project: ProjectDto) => void;
  selectJob: (id: JobDto) => void;
  handleNewProject: (project: ProjectDto) => Promise<void>;
  refetchProjects: () => Promise<ProjectDtoPaginatedCollection | undefined>;
  refetchJobs: () => Promise<ProjectJobsDto | undefined>;
  toggleProjectFavorite: ( project: ProjectDto ) => Promise<void>;
  resetFilters: ( ) => void;
  filterQuery: ProjectTreeQuery
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
  isFiltered: false,
  selectedProjectId: null,
  selectedJobId: null,
  selectProject: () => console.log('No valid context'),
  selectJob: () => console.log('No valid context'),
  handleNewProject: () => new Promise<void>((e) => 'No valid context'),
  refetchProjects: () => new Promise<ProjectDtoPaginatedCollection>((e) => 'No valid context'),
  refetchJobs: () => new Promise<ProjectJobsDto>((e) => 'No valid context'),
  toggleProjectFavorite: () => new Promise<void>( ( e ) => 'No valid context' ),
  setFavoritesOnlyFilter: () => console.log('No valid context'),
  setNameFilter: () => console.log('No valid context'),
  setSort: () => console.log('No valid context'),
  setPage: () => console.log('No valid context'),
  setRequestedPageSize: () => console.log( 'No valid context' ),
  resetFilters: () => console.log( 'No valid context' ),
  filterQuery: {favoriteOnly: false, name: ''}
});

export const useTreeContext = () => useContext(TreeContext);
