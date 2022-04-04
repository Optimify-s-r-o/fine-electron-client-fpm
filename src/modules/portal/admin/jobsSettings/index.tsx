import { faFolder, faPlus, faRefresh } from '@fortawesome/pro-light-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Button } from 'components/Form/Button';
import { PlainButton } from 'components/Form/Button/PlainButton';
import { TextInput } from 'components/Form/Input/Text/TextInput';
import { CardTable } from 'components/Table/CardTable';
import * as GS from 'constants/globalStyles';
import { RoutesPath } from 'constants/routes';
import Dropzone from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import useModal from 'utils/hooks/useModal';
import * as Yup from 'yup';
import { JobTranslationCreateRequest, JobTranslationDto } from '../../../../api/generated/api';
import { uploadJobTranslationIconAsync } from '../../../../utils/file';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { useJobTranslationsContext } from '../../context/JobTranslations/JobTranslationsContext';
import adminNav from '../adminNav';
import editModal from './editModal';

const IconField = ({
  url,
  record,
  onFileChanged
}: {
  url?: string;
  record: any;
  onFileChanged: (file: File | null, record: any) => void;
}) => {
  const { t } = useTranslation(['form']);

  return (
    <Dropzone
      accept={'image/*'}
      onDrop={(acceptedFiles: File[]) => {
        onFileChanged(acceptedFiles[0], record);
      }}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <>
          <input {...getInputProps()} multiple={false} id="icon-input" tabIndex={-1} />
          <DropLabel htmlFor="icon-input" {...getRootProps()} isDragActive={isDragActive}>
            {url ? (
              <GS.RowAlignCenter>
                <Icon src={url} alt={record.name + ' icon'} />
                <PlainButton loading={false} icon={faRefresh} type="button" level={3}>
                  {t('form:table.iconChange')}
                </PlainButton>
              </GS.RowAlignCenter>
            ) : (
              <PlainButton loading={false} icon={faPlus} type="button" level={3}>
                {t('form:table.iconAdd')}
              </PlainButton>
            )}
          </DropLabel>
        </>
      )}
    </Dropzone>
  );
};

const JobsSettings = () => {
  const { t } = useTranslation(['portal', 'form', 'common']);
  const { jobTranslations, loading, refetch } = useJobTranslationsContext();
  const modal = useModal();

  const [createJobTranslation, { loading: createLoading }] = useApi<
    JobTranslationCreateRequest,
    JobTranslationDto
  >();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<JobTranslationDto>({
    resolver: yupResolver(
      Yup.object().shape({
        language: Yup.string().required(t('form:validation.required')),
        type: Yup.string().required(t('form:validation.required')),
        translation: Yup.string().required(t('form:validation.required'))
      })
    ),
    shouldUnregister: true
  });

  const onFileChanged = async (file: File | null, record: JobTranslationDto) => {
    if (file !== null) {
      toast.info(t('portal:admin.applications.uploadingIcon'));
      const success = await uploadJobTranslationIconAsync(record.id, file);

      if (success) {
        toast.success(t('portal:admin.applications.uploadIconSuccess'));
        refetch();
      }
    }
  };

  const onSubmit = async (data: JobTranslationCreateRequest) => {
    console.log(data);
  };

  const createJobTranslationHandler = async (request: JobTranslationCreateRequest) => {
    toast.info(t('portal:admin.jobTranslations.creatingInfo'));

    try {
      await createJobTranslation(() =>
        API.JobTranslationsApi.fineProjectManagerApiJobtranslationsPost(request)
      );
      toast.success(t('portal:admin.jobTranslations.creatingDone'));

      return true;
    } catch {
      return false;
    }
  };

  const onEdit = () => {};

  return (
    <MainWrapper
      icon={faFolder}
      title={t('portal:admin.title')}
      navigation={adminNav(t, RoutesPath.ADMIN_JOBS_SETTINGS)}>
      <S.MainFormContent onSubmit={handleSubmit(onSubmit)}>
        <S.ContentWrapper>
          <CardTable
            columns={[
              {
                title: t('form:table.jobTranslation'),
                render: (t: string, _r: any) => t,
                dataIndex: 'translation'
              },
              {
                title: t('form:table.jobTranslationType'),
                render: (t: string, _r: any) => t,
                width: '300px',
                dataIndex: 'type'
              },
              {
                title: t('form:table.jobTranslationLanguage'),
                render: (t: string, _r: any) => t,
                dataIndex: 'language'
              },
              {
                title: t('form:table.icon'),
                render: (url: string, r: any) => (
                  <IconField url={url} record={r} onFileChanged={onFileChanged} />
                ),
                dataIndex: 'icon'
              },
              {
                title: '',
                render: (_t: undefined, r: JobTranslationDto) => (
                  <GS.FloatRight>
                    <PlainButton
                      loading={loading}
                      type="button"
                      onClick={() => {
                        modal.showModal(editModal(register, handleSubmit(onEdit), t));
                      }}>
                      {t('form:table.jobEdit')}
                    </PlainButton>
                  </GS.FloatRight>
                )
              }
            ]}
            dataSource={jobTranslations}
            emptyTableText={false ? t('form:table.loading') : t('form:table.noJobTranslations')}
            loading={loading}
            extraRow={
              <GS.Center>
                <PlainButton
                  loading={false}
                  icon={faPlus}
                  type="button"
                  onClick={() => {
                    modal.showModal({
                      title: t('form:table.jobTranslationAdd'),
                      content: (
                        <>
                          <TextInput
                            register={register}
                            name="language"
                            title={t('form:table.jobTranslationLanguage')}
                            errors={errors}
                          />
                          <TextInput
                            register={register}
                            name="type"
                            title={t('form:table.jobTranslationType')}
                            errors={errors}
                          />
                          <TextInput
                            register={register}
                            name="translation"
                            title={t('form:table.jobTranslation')}
                            errors={errors}
                          />
                        </>
                      ),
                      footer: (
                        <>
                          <Button loading={createLoading}>
                            {t('form:table.jobTranslationAdd')}
                          </Button>
                        </>
                      ),
                      onSubmit: handleSubmit(async (request: JobTranslationCreateRequest) => {
                        const success = await createJobTranslationHandler(request);
                        if (success) {
                          await refetch();
                          modal.closeModal();
                        }
                      })
                    });
                  }}>
                  {t('form:table.jobTranslationAdd')}
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

const Icon = styled.img`
  width: 28px;
  height: 28px;

  margin-right: 8px;
`;

const DropLabel = styled.label<{ isDragActive: boolean }>`
  display: inline-block;

  border-radius: 3px;
  outline: ${(props) => (props.isDragActive ? '2px dashed ' + props.theme.common.darker : 'none')};
`;
