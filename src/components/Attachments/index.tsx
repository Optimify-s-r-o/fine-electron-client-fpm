import * as S from 'modules/portal/components/main/styled';
import { CardTable } from 'components/Table/CardTable';
import { FileLinksResponse, FileOperationResponse } from 'api/generated';
import { useTranslation } from 'react-i18next';
import { Input } from 'components/Form/Input/styled';
import * as GS from 'constants/globalStyles';
import { PlainButton } from 'components/Form/Button/PlainButton';
import { faDownload, faPlus, faTrashCan } from '@fortawesome/pro-light-svg-icons';
import { ChangeEvent, MouseEvent, useRef } from 'react';
import { IconButton } from 'components/Form/Button/IconButton';
import { DeleteButton } from 'components/Form/Button/DeleteButton';
import useModal from 'utils/hooks/useModal';

export const EditAttachments = ({
  addFiles,
  addFile,
  data,
  deleteFile,
  loading,
  onDownloadJob
}: {
  addFiles: (files: File[]) => void;
  addFile: (file: File) => void;
  data: FileLinksResponse | null | undefined;
  deleteFile: (key: string) => (_e: MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
  onDownloadJob: (r: FileOperationResponse) => (_e: MouseEvent<HTMLButtonElement>) => void;
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
              title: <Input placeholder={t('form:input.searchPlaceholder')} />,
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
          dataSource={data?.files}
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
