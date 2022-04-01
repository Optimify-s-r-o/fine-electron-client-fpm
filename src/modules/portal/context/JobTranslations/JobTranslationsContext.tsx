import { createContext, useContext } from 'react';

import { JobAttributeDto, JobTranslationDto } from '../../../../api/generated/api';

export const JobTranslationsContext = createContext<{
  loading: boolean;
  jobTranslations: JobTranslationDto[];
  getJobTranslationsByLanguage: ( language: string ) => JobTranslationDto[];
  getJobTranslation: ( type: string, language: string ) => string;
  getAttributeTranslation: ( jobType: string, attribute: JobAttributeDto, language: string ) => string;
  refetch: () => Promise<void>;
}>( {
  loading: false,
  jobTranslations: [],
  getJobTranslationsByLanguage: ( language: string ) => [],
  getJobTranslation: ( type: string, language: string ) => 'no valid context',
  getAttributeTranslation: ( jobType: string, attribute: JobAttributeDto, language: string ) => 'no valid context',
  refetch: () => new Promise<void>( ( e ) => 'no valid context' ),
} );

export const useExecutableApplicationContext = () => useContext( JobTranslationsContext );
