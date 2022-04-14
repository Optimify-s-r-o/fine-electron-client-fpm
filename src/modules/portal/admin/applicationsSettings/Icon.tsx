import { PlainButton } from 'components/Form/Button/PlainButton';
import Dropzone from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import * as GS from 'constants/globalStyles';
import { faPlus, faRefresh } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { ApplicationDto } from 'api/generated';
import { uploadApplicationIconAsync } from 'utils/file';
import { useApplicationContext } from 'modules/portal/context/Applications/ApplicationsContext';

const Icon = ({ url, record }: { url?: string; record: any }) => {
  const { t } = useTranslation(['form']);
  const { refetch } = useApplicationContext();

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
                <IconSrc src={url} alt={record.name + ' icon'} />
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

export default Icon;

const IconSrc = styled.img`
  width: 28px;
  height: 28px;

  margin-right: 8px;
`;

const DropLabel = styled.label<{ isDragActive: boolean }>`
  display: inline-block;

  border-radius: 3px;
  outline: ${(props) => (props.isDragActive ? '2px dashed ' + props.theme.common.darker : 'none')};
`;
