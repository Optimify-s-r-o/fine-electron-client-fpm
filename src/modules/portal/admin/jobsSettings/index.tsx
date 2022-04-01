import { faFolder, faPlus } from '@fortawesome/pro-light-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Button } from 'components/Form/Button';
import { PlainButton } from 'components/Form/Button/PlainButton';
import { TextInput } from 'components/Form/Input/Text/TextInput';
import { CardTable } from 'components/Table/CardTable';
import * as GS from 'constants/globalStyles';
import { RoutesPath } from 'constants/routes';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import useModal from 'utils/hooks/useModal';
import * as Yup from 'yup';

import { ApplicationDto, JobTranslationCreateRequest, JobTranslationDto } from '../../../../api/generated/api';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { useJobTranslationsContext } from '../../context/JobTranslations/JobTranslationsContext';
import adminNav from '../adminNav';

const JobsSettings = () => {
  const { t } = useTranslation( ['portal', 'form', 'common'] );
  const { jobTranslations, loading, refetch } = useJobTranslationsContext();
  const modal = useModal();

  const [createJobTranslation, { loading: createLoading }] = useApi<
    JobTranslationCreateRequest,
    JobTranslationDto
  >();

  const { register, handleSubmit } = useForm<JobTranslationDto>( {
    resolver: yupResolver(
      Yup.object().shape( {
        name: Yup.string().required( t( 'form:validation.required' ) )
      } )
    ),
    shouldUnregister: true
  } );

  const onSubmit = async ( data: JobTranslationCreateRequest ) => {
    console.log( data );
  };

  const createJobTranslationHandler = async ( request: JobTranslationCreateRequest ) => {
    toast.info( t( 'portal:admin.applications.creatingInfo' ) );

    try {
      await createJobTranslation( () =>
        API.JobTranslationsApi.fineProjectManagerApiJobtranslationsPost( request )
      );
      toast.success( t( 'portal:admin.applications.creatingDone' ) );

      return true;
    } catch {
      return false;
    }
  };

  return (
    <MainWrapper
      icon={faFolder}
      title={t( 'portal:admin.title' )}
      navigation={adminNav( t, RoutesPath.ADMIN_JOBS_SETTINGS )}>
      <S.MainFormContent onSubmit={handleSubmit( onSubmit )}>
        <S.ContentWrapper>
          <CardTable
            columns={[
              {
                title: t( 'form:table.jobTranslationLanguage' ),
                render: ( t: string, _r: any ) => t,
                width: '300px',
                dataIndex: 'language'
              },
              {
                title: t( 'form:table.jobTranslationType' ),
                render: ( t: string, _r: any ) => t,
                width: '300px',
                dataIndex: 'type'
              },
              {
                title: t( 'form:table.jobTranslation' ),
                render: ( t: string, _r: any ) => t,
                dataIndex: 'translation'
              },
              {
                title: t( 'form:table.icon' ),
                render: ( t: string, _r: any ) => t,
                dataIndex: 'icon'
              },
              {
                title: '',
                render: ( _t: undefined, r: ApplicationDto ) => (
                  <GS.FloatRight>
                    <PlainButton loading={false} onClick={() => { }}>
                      {t( 'form:table.jobEdit' )}
                    </PlainButton>
                  </GS.FloatRight>
                )
              }
            ]}
            dataSource={jobTranslations}
            emptyTableText={false ? t( 'form:table.loading' ) : t( 'form:table.noJobTranslations' )}
            loading={loading}
            extraRow={
              <GS.Center>
                <PlainButton
                  loading={false}
                  icon={faPlus}
                  type="button"
                  onClick={() => {
                    modal.showModal( {
                      title: t( 'form:table.jobTranslationAdd' ),
                      content: (
                        <>
                          <TextInput
                            register={register}
                            name="language"
                            title={t( 'form:table.jobTranslationLanguage' )}
                          />
                          <TextInput
                            register={register}
                            name="type"
                            title={t( 'form:table.jobTranslationType' )}
                          />
                          <TextInput
                            register={register}
                            name="translation"
                            title={t( 'form:table.jobTranslation' )}
                          />
                        </>
                      ),
                      footer: (
                        <>
                          <Button loading={createLoading}>{t( 'form:table.jobTranslationAdd' )}</Button>
                        </>
                      ),
                      onSubmit: handleSubmit( async ( request: JobTranslationCreateRequest ) => {
                        const success = await createJobTranslationHandler( request );
                        if ( success ) {
                          await refetch();
                          modal.closeModal();
                        }
                      } )
                    } );
                  }}>
                  {t( 'form:table.programAdd' )}
                </PlainButton>
              </GS.Center>
            }
          />
        </S.ContentWrapper>
      </S.MainFormContent>
    </MainWrapper>
  );
};

export default JobsSettings;

