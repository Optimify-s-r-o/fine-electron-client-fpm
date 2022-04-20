import { faDownload, faPlus, faTrashCan } from '@fortawesome/pro-light-svg-icons';
import { FileOperationResponse } from 'api/generated';
import { DeleteButton } from 'components/Form/Button/DeleteButton';
import { IconButton } from 'components/Form/Button/IconButton';
import { PlainButton } from 'components/Form/Button/PlainButton';
import { Input } from 'components/Form/Input/styled';
import { CardTable } from 'components/Table/CardTable';
import * as GS from 'constants/globalStyles';
import * as S from 'modules/portal/components/main/styled';
import { ChangeEvent, MouseEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useModal from 'utils/hooks/useModal';

export const EditAttachments = ({
  addFiles,
  addFile,
  data,
  deleteFile,
  loading,
  onDownloadJob,
  onSearch
}: {
  addFiles: (files: File[]) => void;
  addFile: (file: File) => void;
  data: FileOperationResponse[] | null | undefined;
  deleteFile: (key: string) => (_e: MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
  onDownloadJob: (r: FileOperationResponse) => (_e: MouseEvent<HTMLButtonElement>) => void;
  onSearch: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
}) => {
  const { t } = useTranslation(['portal', 'form', 'common']);

  const modal = useModal();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onDeleteJob = (r: FileOperationResponse) => (_e: MouseEvent<HTMLButtonElement>) => {
    modal.showModal({
      title: t('form:modal.files.fileDeleteHeader'),
      content: <>{t('form:modal.files.fileDeleteContent', { file: r.fullName })}</>,
      footer: (
        <GS.FloatRight>
          <DeleteButton loading={false} onClick={deleteFile(r.key)}>
            {t('form:button.deleteFile')}
          </DeleteButton>
        </GS.FloatRight>
      )
    });
  };
  return (
    <S.MainContent>
      <S.ContentWrapper>
        <CardTable
          columns={[
            {
              title: t('form:table.fileName'),
              render: (t: string, _r: FileOperationResponse) => <>{t}</>,
              dataIndex: 'fullName'
            },
            {
              title: t('form:table.fileExtension'),
              render: (t, _r: FileOperationResponse) => <>{t}</>,
              dataIndex: 'extension'
            },
            {
              title: <Input placeholder={t('form:input.searchPlaceholder')} onChange={onSearch} />,
              dataIndex: 'id',
              render: (t, r: FileOperationResponse) => (
                <GS.FloatRight>
                  <IconButton
                    loading={false}
                    icon={faDownload}
                    onClick={onDownloadJob(r)}
                    type="button"
                  />
                  <IconButton
                    loading={false}
                    icon={faTrashCan}
                    onClick={onDeleteJob(r)}
                    type="button"
                  />
                </GS.FloatRight>
              )
            }
          ]}
          dataSource={data}
          onFilesDrop={addFiles}
          extraRow={
            <GS.Center>
              <label htmlFor="add-file">
                <PlainButton
                  loading={false}
                  icon={faPlus}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }}>
                  {t('form:table.fileAdd')}
                </PlainButton>
                <input
                  ref={fileInputRef}
                  id="add-file"
                  type="file"
                  multiple
                  style={{ display: 'none' }}
                  autoComplete={'off'}
                  tabIndex={-1}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) addFile(e.target.files[0]);
                  }}
                />
              </label>
            </GS.Center>
          }
          emptyTableText={loading ? t('form:table.loading') : t('form:table.noFiles')}
        />
      </S.ContentWrapper>
    </S.MainContent>
  );
};
