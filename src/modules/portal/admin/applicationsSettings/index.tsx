import { faFolder, faPencil, faPlus, faRefresh } from '@fortawesome/pro-light-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Button } from 'components/Form/Button';
import { CloseButton } from 'components/Form/Button/CloseButton';
import { DeleteButton } from 'components/Form/Button/DeleteButton';
import { IconButton } from 'components/Form/Button/IconButton';
import { PlainButton } from 'components/Form/Button/PlainButton';
import { Input } from 'components/Form/Input/styled';
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
import { uploadApplicationIconAsync } from 'utils/file';
import { useApi } from 'utils/hooks/useApi';
import useModal from 'utils/hooks/useModal';
import * as Yup from 'yup';

import { ApplicationCreateRequest, ApplicationDto } from '../../../../api/generated/api';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { useApplicationContext } from '../../context/Applications/ApplicationsContext';
import adminNav from '../adminNav';
import CreateModal from './Modal/CreateModal';
import ExtensionModal from './Modal/ExtensionModal';

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

const ApplicationsSettings = () => {
  const { t } = useTranslation(['portal', 'form', 'common']);
  const { applications, loading, refetch } = useApplicationContext();
  const [deleteApplication, { loading: deleteLoading }] = useApi();
  const modal = useModal();

  const onSubmit = async (data: ApplicationCreateRequest) => {
    console.log(data);
  };

  const { register, handleSubmit } = useForm<ApplicationDto>({
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required(t('form:validation.required'))
      })
    ),
    shouldUnregister: true
  });

  const onFileChanged = async (file: File | null, record: ApplicationDto) => {
    if (file !== null) {
      toast.info(t('portal:admin.applications.uploadingIcon'));
      const success = await uploadApplicationIconAsync(record.id, file);

      if (success) {
        toast.success(t('portal:admin.applications.uploadIconSuccess'));
        refetch();
      }
    }
  };

  const deleteApplicationHandler = async (id: string) => {
    toast.info(t('portal:admin.applications.deletingInfo'));

    try {
      await deleteApplication(() =>
        API.ApplicationsApi.fineProjectManagerApiApplicationsIdDelete(id)
      );
      toast.success(t('portal:admin.applications.deletingDone'));

      return true;
    } catch {
      return false;
    }
  };

  const codeRender = (text: string, _r: ApplicationDto) => (
    <GS.Row>
      <EditButtonWrapper>
        <IconButton
          loading={false}
          btnStyle="plain"
          icon={faPencil}
          type="button"
          onClick={() => {
            modal.showModal({
              title: t('form:table.programChange'),
              content: (
                <>
                  <TextInput register={register} name="name" title={t('form:table.programName')} />
                </>
              ),
              footer: (
                <>
                  <Button loading={false}>{t('form:table.programChange')}</Button>
                </>
              ),
              onSubmit: handleSubmit(() => {
                alert('TODO karel');
                modal.closeModal();
              })
            });
          }}
        />
      </EditButtonWrapper>
      <Title>{text}</Title>
    </GS.Row>
  );

  const extensionsRender = (extensions: Array<string>, application: ApplicationDto) => {
    return (
      <GS.Row>
        <EditButtonWrapper>
          <ExtensionModal extensions={extensions} application={application} />
        </EditButtonWrapper>
        <Title>
          {extensions.length === 0 ? (
            <NotSet>{t('form:table.programExtensionsNotSet')}</NotSet>
          ) : (
            extensions.join(', ')
          )}
        </Title>
      </GS.Row>
    );
  };

  return (
    <MainWrapper
      icon={faFolder}
      title={t('portal:admin.title')}
      navigation={adminNav(t, RoutesPath.ADMIN_APPLICATIONS_SETTINGS)}>
      <S.MainFormContent onSubmit={handleSubmit(onSubmit)}>
        <S.ContentWrapper>
          <CardTable
            columns={[
              {
                title: t('form:table.programName'),
                render: (t: string, _r: any) => t,
                width: '300px',
                dataIndex: 'name'
              },
              {
                title: t('form:table.programCode'),
                render: codeRender,
                dataIndex: 'code'
              },
              {
                title: t('form:table.programExtension'),
                render: extensionsRender,
                dataIndex: 'extensions'
              },
              {
                title: t('form:table.programIcon'),
                render: (url: string, r: any) => (
                  <IconField url={url} record={r} onFileChanged={onFileChanged} />
                ),
                dataIndex: 'icon'
              },
              {
                title: <Input placeholder={t('form:input.searchPlaceholder')} />,
                render: (_t: undefined, r: ApplicationDto) => (
                  <GS.FloatRight>
                    <CloseButton
                      onClick={() =>
                        modal.showModal({
                          title: t('form:table.applicationDelete'),
                          content: (
                            <>
                              {`${t('portal:admin.applications.deleteConfirmationTextPart1')} ${
                                r.name
                              }?${t('portal:admin.applications.deleteConfirmationTextPart2')}.`}
                            </>
                          ),
                          footer: (
                            <GS.RowEnd>
                              <DeleteButton
                                loading={deleteLoading}
                                onClick={async () => {
                                  const success = await deleteApplicationHandler(r.id);
                                  if (success) {
                                    await refetch();
                                    modal.closeModal();
                                  }
                                }}>
                                {t('form:table.confirm')}
                              </DeleteButton>
                            </GS.RowEnd>
                          )
                        })
                      }
                    />
                  </GS.FloatRight>
                )
              }
            ]}
            dataSource={applications}
            emptyTableText={loading ? t('form:table.loading') : t('form:table.noPrograms')}
            extraRow={
              <GS.Center>
                <CreateModal />
              </GS.Center>
            }
          />
        </S.ContentWrapper>
      </S.MainFormContent>
    </MainWrapper>
  );
};

export default ApplicationsSettings;

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

const EditButtonWrapper = styled.div`
  float: right;

  margin-right: 16px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;

const NotSet = styled.span`
  color: #727272;
`;
