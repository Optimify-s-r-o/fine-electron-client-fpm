import { faFolder, faPlus, faRefresh } from '@fortawesome/pro-light-svg-icons';
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

  const { register, handleSubmit, resetField } = useForm<ApplicationCreateRequest>({
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required(t('form:validation.required'))
      })
    )
  });

  const onFileChanged = (file: File | null, record: any) => {
    alert('TODO upload file');
  };

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
                render: (t: string, _r: any) => t,
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
            dataSource={[
              {
                name: 'Facebook',
                code: 'c1c6fc98-8359-4a60-8d8a-4e986f2b11ac',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Facebook_icon_2013.svg'
              },
              {
                name: 'Instagram',
                code: 'c1c6fc98-8359-4a60-8d8a-4e986f2b11ac'
              }
            ]}
            emptyTableText={t('form:table.noPrograms')}
            extraRow={
              <GS.Center>
                <PlainButton
                  loading={false}
                  icon={faPlus}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
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
                      }),
                      onClose: () => {
                        resetField('name');
                        return true;
                      }
                    });
                  }}>
                  {t('form:table.programAdd')}
                </PlainButton>
              </GS.Center>
            }
          />
          <div>
            Cast1: Vypsat existujici programy, je to tabulka bez pagination, bude tam jenom par
            zaznamu
          </div>
          <div>
            Ikony by mely chodit uz primo jako url pro rychlejsi zobrazeni, pokud tam ikona neni,
            oznac prosim nejak viditelne ze by tam mela jit pridat
          </div>
          <div>
            Zaroven potrevujem aby to misto s ikonou dokazalo nahravat soubory - klasicky drag and
            drop, nebo na kliknuti
          </div>
          <div>
            {loading
              ? 'loading main'
              : applications.map(
                  (e) => `Nazev programu: ${e.name} Interni kod programu: ${e.code} Icon: ${e.icon}`
                )}
          </div>
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
