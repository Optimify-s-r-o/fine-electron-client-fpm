import { useEffect, useState } from 'react';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import { useEffectAsync } from 'utils/useEffectAsync';

import { JobAttributeDto, JobTranslationDto, JobTranslationDtoPaginatedCollection } from '../../../../api/generated/api';
import { useAuthContext } from '../../../auth/context/AuthContext';
import { JobTranslationsContext } from './JobTranslationsContext';

export const JobTranslationsProvider = ( { children }: { children: JSX.Element; } ) => {
  const { isLogged, user } = useAuthContext();

  const [getTranslations, { loading: apiLoading }] = useApi<JobTranslationDtoPaginatedCollection>();

  const [language, setLanguage] = useState<string>( '' );
  const [translations, setTranslations] = useState<JobTranslationDto[]>( [] );
  const [loading, setLoading] = useState<boolean>( false );

  useEffectAsync( async () => {
    setLanguage( await window.API.invoke( 'ELECTRON_STORE_GET', { name: 'language' } ) );
  }, [] );

  useEffectAsync( async () => {
    if ( isLogged ) {
      const res = await getTranslations( () => API.JobTranslationsApi.fineProjectManagerApiJobtranslationsNoPaginationGet() );
      setTranslations( res.data );
    }
  }, [isLogged, user] );

  useEffect( () => {
    setLoading( apiLoading );
  }, [apiLoading] );

  const getJobTranslationsByLanguage = ( language: string ): JobTranslationDto[] => {
    return translations.filter( e => e.language === language );
  };

  const getJobTranslation = ( type: string, language: string ): string => {
    const res = translations.filter( e => e.language === language && e.type === type );
    if ( res.length > 0 && res[0].translation ) return res[0].translation;
    return type;
  };

  const getJobIcon = ( type: string, language: string ) => {
    const res = translations.filter( e => e.language === language && e.type === type );
    if ( res.length > 0 && res[0].icon ) return res[0].icon;
    return null;
  };

  const getAttributeTranslation = ( jobType: string, attribute: JobAttributeDto, language: string ): string => {
    const missingTranslation = attribute.name ?? '';

    const jobTranslations = translations.filter( e => e.language === language && e.type === jobType );
    if ( jobTranslations.length === 0 ) return missingTranslation;

    const jobTranslation = jobTranslations[0];
    const res = jobTranslation.attributes?.filter( e => e.normalizedName === attribute.normalizedName );
    if ( !res || res.length === 0 ) return missingTranslation;

    return res[0].translation ?? missingTranslation;
  };

  const refetch = async (): Promise<void> => {
    const res = await getTranslations( () => API.JobTranslationsApi.fineProjectManagerApiJobtranslationsNoPaginationGet() );
    setTranslations( res.data );
  };

  const externalSetLanguage = async ( language: string ) => {
    await window.API.invoke( 'ELECTRON_STORE_SET', { name: 'language', value: language } );
    setLanguage( language );
  };

  return (
    <JobTranslationsContext.Provider
      value={{
        loading: loading,
        jobTranslations: translations,
        getJobTranslationsByLanguage: getJobTranslationsByLanguage,
        getJobTranslation: getJobTranslation,
        getJobIcon: getJobIcon,
        getAttributeTranslation: getAttributeTranslation,
        refetch: refetch,
        language: language,
        setLanguage: externalSetLanguage
      }}>
      {children}
    </JobTranslationsContext.Provider>
  );
};
