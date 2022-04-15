import { faFolder, faPlus, faRefresh } from '@fortawesome/pro-light-svg-icons';
import { PlainButton } from 'components/Form/Button/PlainButton';
import { CardTable } from 'components/Table/CardTable';
import * as GS from 'constants/globalStyles';
import { RoutesPath } from 'constants/routes';
import Dropzone from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { JobTranslationDto } from '../../../../api/generated/api';
import { uploadJobTranslationIconAsync } from '../../../../utils/file';
import { MainWrapper } from '../../components/main/components/MainWrapper';
import * as S from '../../components/main/styled';
import { useJobTranslationsContext } from '../../context/JobTranslations/JobTranslationsContext';
import adminNav from '../adminNav';
import CreateModal from './Modal/CreateModal';
import EditModal from './Modal/EditModal';

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

  return (
    <MainWrapper
      icon={faFolder}
      title={t('portal:admin.title')}
      navigation={adminNav(t, RoutesPath.ADMIN_JOBS_SETTINGS)}>
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
                  <EditModal jobTranslation={r} />
                </GS.FloatRight>
              )
            }
          ]}
          dataSource={jobTranslations}
          emptyTableText={false ? t('form:table.loading') : t('form:table.noJobTranslations')}
          loading={loading}
          extraRow={
            <GS.Center>
              <CreateModal />
            </GS.Center>
          }
        />
      </S.ContentWrapper>
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
