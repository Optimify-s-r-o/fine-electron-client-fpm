import { createContext, useContext } from 'react';
import {
  JobAttributeDto,
  JobTranslationCreateRequest,
  JobTranslationDto,
  JobTranslationUpdateRequest
} from '../../../../api/generated/api';

export const JobTranslationsContext = createContext<{
  loading: boolean;
  jobTranslations: JobTranslationDto[];
  language: string;
  setLanguage: (language: string) => Promise<void>;
  getJobTranslationsByLanguage: (language: string) => JobTranslationDto[];
  getJobTranslation: (type: string | null | undefined, language: string) => string;
  getJobIcon: (type: string | null | undefined, language: string) => string | undefined;
  getAttributeTranslation: (
    jobType: string,
    attribute: JobAttributeDto,
    language: string
  ) => string;
  refetch: () => Promise<void>;
  create: (jobTranslation: JobTranslationCreateRequest) => Promise<void>;
  createLoading: boolean;
  edit: (jobTranslation: JobTranslationUpdateRequest) => Promise<JobTranslationDto>;
  editLoading: boolean;
  delete: (jobTranslationId: string) => Promise<void>;
  deleteLoading: boolean;
}>({
  loading: false,
  jobTranslations: [],
  language: 'no valid context',
  setLanguage: (language: string) => new Promise<void>((e) => 'no valid context'),
  getJobTranslationsByLanguage: (language: string) => [],
  getJobTranslation: (type: string | null | undefined, language: string) => 'no valid context',
  getJobIcon: (type: string | null | undefined, language: string) => undefined,
  getAttributeTranslation: (jobType: string, attribute: JobAttributeDto, language: string) =>
    'no valid context',
  refetch: () => new Promise<void>((e) => 'no valid context'),
  create: () => new Promise<void>((e) => 'no valid context'),
  createLoading: false,
  edit: () => new Promise<JobTranslationDto>((e) => 'no valid context'),
  editLoading: false,
  delete: () => new Promise<void>((e) => 'no valid context'),
  deleteLoading: false
});

export const useJobTranslationsContext = () => useContext(JobTranslationsContext);
