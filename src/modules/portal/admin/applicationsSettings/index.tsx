import { faFolder, faPencil, faPlus, faRefresh } from '@fortawesome/pro-light-svg-icons';
import { faDatabase } from '@fortawesome/pro-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Button } from 'components/Form/Button';
import { Input } from 'components/Form/Input/styled';
import { CardTable } from 'components/Table/CardTable';
import { RoutesPath } from 'constants/routes';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import * as GS from 'constants/globalStyles';
import { ApplicationCreateRequest } from '../../../../api/generated/api';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { useApplicationContext } from '../../context/Applications/ApplicationsContext';
import { CloseButton } from 'components/Form/Button/CloseButton';
import { PlainButton } from 'components/Form/Button/PlainButton';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import useModal from 'utils/hooks/useModal';
import { TextInput } from 'components/Form/Input/Text/TextInput';

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
          <input {...getInputProps()} multiple={false} id="icon-input" />
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
  const { applications, loading } = useApplicationContext();
  const modal = useModal();

  const onSubmit = async (data: ApplicationCreateRequest) => {
    console.log(data);
  };

  const { register, handleSubmit } = useForm<ApplicationCreateRequest>({
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required(t('form:validation.required'))
      })
    ),
    shouldUnregister: true
  });

  const onFileChanged = (file: File | null, record: any) => {
    alert('TODO upload file');
  };

  const titleRender = (text: string, _r: any) => (
    <>
      {text}
      <MarginLeft>
        <PlainButton
          loading={false}
          level={3}
          icon={faPencil}
          type="button"
          onClick={() => {
            modal.showModal({
              title: t('form:table.programRename'),
              content: (
                <>
                  <TextInput register={register} name="name" title={t('form:table.programName')} />
                </>
              ),
              footer: (
                <>
                  <Button loading={false}>{t('form:table.programRename')}</Button>
                </>
              ),
              onSubmit: handleSubmit(() => {
                alert('TODO karel');
                modal.closeModal();
              })
            });
          }}>
          {t('form:table.rename')}
        </PlainButton>
      </MarginLeft>
    </>
  );

  return (
    <MainWrapper
      icon={faFolder}
      title={t('portal:admin.title')}
      navigation={[
        {
          path: RoutesPath.ADMIN_APPLICATIONS_SETTINGS,
          active: true,
          text: t('portal:admin.tabs.applicationsSettings'),
          icon: faDatabase
        }
      ]}>
      <S.MainFormContent onSubmit={handleSubmit(onSubmit)}>
        <S.ContentWrapper>
          <CardTable
            columns={[
              {
                title: t('form:table.programName'),
                render: titleRender,
                dataIndex: 'name'
              },
              {
                title: t('form:table.programCode'),
                render: (t: string, _r: any) => t,
                dataIndex: 'code'
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
                render: (_t: undefined, r: any) => (
                  <GS.FloatRight>
                    <CloseButton onClick={() => alert('TODO remove record')} />
                  </GS.FloatRight>
                )
              }
            ]}
            dataSource={applications}
            emptyTableText={loading ? t('form:table.loading') : t('form:table.noPrograms')}
            extraRow={
              <GS.Center>
                <PlainButton
                  loading={false}
                  icon={faPlus}
                  type="button"
                  onClick={() => {
                    modal.showModal({
                      title: t('form:table.programAdd'),
                      content: (
                        <>
                          <TextInput
                            register={register}
                            name="name"
                            title={t('form:table.programName')}
                          />
                        </>
                      ),
                      footer: (
                        <>
                          <Button loading={false}>{t('form:table.programAdd')}</Button>
                        </>
                      ),
                      onSubmit: handleSubmit(() => {
                        alert('TODO karel');
                        modal.closeModal();
                      })
                    });
                  }}>
                  {t('form:table.programAdd')}
                </PlainButton>
              </GS.Center>
            }
          />
        </S.ContentWrapper>
        <S.ButtonsWrapper>
          <Button loading={false}>{t('form:button.save')}</Button>
        </S.ButtonsWrapper>
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

const MarginLeft = styled.span`
  margin-left: 16px;
`;
