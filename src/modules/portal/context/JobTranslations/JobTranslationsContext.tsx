import { createContext, useContext } from 'react';

import { JobAttributeDto, JobTranslationDto } from '../../../../api/generated/api';

export const JobTranslationsContext = createContext<{
  loading: boolean;
  jobTranslations: JobTranslationDto[];
  language: string;
  setLanguage: ( language: string ) => Promise<void>;
  getJobTranslationsByLanguage: ( language: string ) => JobTranslationDto[];
  getJobTranslation: ( type: string, language: string ) => string;
  getJobIcon: ( type: string, language: string ) => string | null;
  getAttributeTranslation: ( jobType: string, attribute: JobAttributeDto, language: string ) => string;
  refetch: () => Promise<void>;
}>( {
  loading: false,
  jobTranslations: [],
  language: 'no valid context',
  setLanguage: ( language: string ) => new Promise<void>( ( e ) => 'no valid context' ),
  getJobTranslationsByLanguage: ( language: string ) => [],
  getJobTranslation: ( type: string, language: string ) => 'no valid context',
  getJobIcon: ( type: string, language: string ) => null,
  getAttributeTranslation: ( jobType: string, attribute: JobAttributeDto, language: string ) => 'no valid context',
  refetch: () => new Promise<void>( ( e ) => 'no valid context' ),
} );

export const useJobTranslationsContext = () => useContext( JobTranslationsContext );
