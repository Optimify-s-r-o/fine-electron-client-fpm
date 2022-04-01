import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import { useEffectAsync } from 'utils/useEffectAsync';
import * as Yup from 'yup';

import { JobCreateRequest, JobDto } from '../../../../../api/generated';
import { FileLinksResponse } from '../../../../../api/generated/api';
import { Button } from '../../../../../components/Form/Button';
import * as S from '../../../components/main/styled';
import { useJobTranslationsContext } from '../../../context/JobTranslations/JobTranslationsContext';

const JobEditGeneral = () => {
  const { t } = useTranslation( ['form'] );
  const { language, getAttributeTranslation, getJobTranslation } = useJobTranslationsContext();
  const { editId } = useParams();

  const [getJobMain, { data: jobMainData, loading: jobMainDataLoading }] = useApi<JobDto>();
  const [getJobPreviewLinks, { data: jobPreviewLinksData, loading: jobPreviewLinksLoading }] = useApi<FileLinksResponse>();

  useEffectAsync( async () => {
    if ( editId ) {
      await getJobMain( () => API.JobsApi.fineProjectManagerApiJobsIdGet( editId ) );
      await getJobPreviewLinks( () => API.JobsApi.fineProjectManagerApiJobsIdPreviewsGet( editId ) );
    }
  }, [editId] );

  const { handleSubmit } = useForm<JobCreateRequest>( {
    resolver: yupResolver(
      Yup.object().shape( {
        name: Yup.string().required( t( 'form:validation.required' ) )
      } )
    )
  } );

  const onSubmit = async ( data: JobCreateRequest ) => {
    console.log( data );
  };

  return (
    <S.MainFormContent onSubmit={handleSubmit( onSubmit )}>
      <S.ContentWrapper>
        {/* Cast 1: Umoznuje zmenit nazev ulohy a jeji popis (zpusobi refresh job stromu), obsahuje tlacitko pro spusteni v pripade, ze se jedna o spustitelnou vec (POZOR! na tohle jsem zapomnel v obrazku)*/}
        {jobMainDataLoading ? 'loading' : `Nazev: ${ jobMainData?.name } Popis: ${ jobMainData?.description }  `}
        {/* Cast 2: Tabulka obsahujici prelozeny seznam atributu*/}
        {/* TODO komponenta na hezky vypis hodnot (co dostane jako argument attribtue a hezky ho vypise, to uz nedavam) */}
        {jobMainDataLoading ? 'loading' : `${ jobMainData?.attributes?.map( e =>
          `Nazev: ${ getAttributeTranslation( e.normalizedName as string, e, language ) } Hodnota: ${ e.value } ${ e.unit }  ` )
          }`}
        {/* Cast 3: obsahuje metadata ohledne ulohy*/}
        {`Typ: ${ getJobTranslation( jobMainData?.type, language ) } Vytvoreno: ${ jobMainData?.createdAt } Posledni editace: ${ jobMainData?.updatedAt } `}
        {/* Cast 4: komponenta na zpusov carouselu, obsahuje nahledy obrazku a POZOR!!!! pdf*/}
        {`Preview linky: ${ jobPreviewLinksLoading ? 'loading' : jobPreviewLinksData?.files?.map( e => `${ e.link } ` ) }`}
      </S.ContentWrapper>
      <S.ButtonsWrapper>
        <Button loading={false}>{t( 'form:button.save' )}</Button>
      </S.ButtonsWrapper>
    </S.MainFormContent>
  );
};

export default JobEditGeneral;
