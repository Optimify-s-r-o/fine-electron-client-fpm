import { faFolder } from '@fortawesome/pro-light-svg-icons';
import { faDatabase } from '@fortawesome/pro-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ProjectCreateRequest, ProjectDto } from 'api/generated';
import { Button } from 'components/Form/Button';
import { RoutesPath } from 'constants/routes';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import * as Yup from 'yup';

import { JobDto, JobResultInformationDto, ProjectJobsDto } from '../../../../api/generated/api';
import { useEffectAsync } from '../../../../utils/useEffectAsync';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';

const EditProject = () => {
  const { editId } = useParams();
  const { t } = useTranslation( ['portal', 'form', 'common'] );

  const [getProjectMain, { loading: mainLoading }] = useApi<ProjectDto>();
  const [getProjectJobs, { loading: jobsLoading }] = useApi<ProjectJobsDto>();

  const [mainData, setMainData] = useState<ProjectDto | null>( null );
  const [jobsData, setJobsData] = useState<JobDto[]>( [] );
  const [jobsInformation, setJobsInformation] = useState<JobResultInformationDto | null>( null );

  const { handleSubmit } = useForm<ProjectCreateRequest>( {
    resolver: yupResolver(
      Yup.object().shape( {
        name: Yup.string().required( t( 'form:validation.required' ) )
      } )
    )
  } );

  const onSubmit = async ( data: ProjectCreateRequest ) => {
    console.log( data );
  };

  //Load everything during window open
  useEffectAsync( async () => {
    if ( editId ) {
      const res = await getProjectMain( () => API.ProjectsApi.fineProjectManagerApiProjectsIdGet( editId ) );
      setMainData( res );
    }
  }, [editId] );

  useEffectAsync( async () => {
    if ( editId ) {
      const res = await getProjectJobs( () => API.ProjectsApi.fineProjectManagerApiProjectsIdJobsGet( editId ) );
      setJobsData( res.jobs );
      setJobsInformation( res.jobInformation );
    }
  }, [editId] );

  return (
    <MainWrapper
      icon={faFolder}
      title={mainLoading || !mainData ? 'Otvírám projekt...' : mainData.name}
      navigation={[
        {
          path: `${ RoutesPath.PROJECTS }/${ editId }`,
          active: true,
          text: t( 'portal:projects.tabs.editProjectMain' ),
          icon: faDatabase
        },
        {
          path: `${ RoutesPath.PROJECTS }/${ editId }/files`,
          active: false,
          text: t( 'portal:projects.tabs.editProjectFiles' ),
          icon: faDatabase
        }
      ]}
    >
      <S.MainFormContent onSubmit={handleSubmit( onSubmit )}>
        <S.ContentWrapper>
          {mainLoading ? 'loading main' :
            <div>
              {'Cast 1 (editovatelna pole, vaze se k nim tlacitko "Ulozit", cili bych ho nedaval uplne dolu, ale nekam pod to):'}
              {`Nazev: ${ mainData?.name }`}
              {`Popis: ${ mainData?.description }`}
            </div>
          }
          <div><br />Cast 2: Tabulka se seznamem jobu, pozor ze jich muze byt docela hodne, radove i desitky, jsou to ale jednoducha data, proto nepouzivame pagination</div>
          {
            jobsLoading ? 'loading jobs' :
              <>
                {/*TODO Karel preklady aplikaci a typu*/}
                {jobsData.map( e => <div>{`Nazev: ${ e.name } Popis: ${ e.description } Typ: ${ e.type } Aplikace: ${ e.application } Pridano: ${ e.createdAt }`}</div> )}
              </>
          }
          <div>Ohledne tlacitek v te tabulce: </div>
          <div>Prvni tlacitko je navigace na {`${ RoutesPath.JOBS }/{id}`}. Ikonu jako chces a je vzdy stejna</div>
          <div>Druhe tlacitko je spusteni programu. Ted nebudeme implementovat. Zobrazuj, pokud e.IsOpenable. Ikonu si budu muset tahat z ApplicationsContextu, bude to url na obrazek, zatim tam dej prosim fixne url na nejaky obrazek</div>
          <div>Treti tlacitko vede na stazeni souboru, pridej jenom ikonku a onClickHandler s logem, zbytek si dodelam</div>
          <div>Posledni tlacitko vyvola modal s dotazem na delete, ten prosim udelej, delete tlacitko si implementuju</div>
          <div><br />Cast 3: Jednoduchy vypis</div>
          {
            jobsLoading || !jobsInformation ? 'loading jobs' :
              <>
                <div>Pocet uloh: {jobsInformation.openableCount}</div>
                {Object.entries( jobsInformation.otherJobs ).map( e => `${ e[0] }: ${ e[1] }` )}
              </>
          }
        </S.ContentWrapper>
        <S.ButtonsWrapper>
          <Button loading={false}>{t( 'form:button.save' )}</Button>
        </S.ButtonsWrapper>
      </S.MainFormContent>
    </MainWrapper>
  );
};

export default EditProject;
