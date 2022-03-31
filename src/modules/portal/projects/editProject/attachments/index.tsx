import * as S from '../../../components/main/styled';
import { CardTable } from 'components/Table/CardTable';
import { FileLinksResponse, FileOperationResponse } from 'api/generated';
import { useTranslation } from 'react-i18next';
import { useApi } from 'utils/hooks/useApi';
import { useEffectAsync } from 'utils/useEffectAsync';
import API from 'utils/api';
import { useParams } from 'react-router-dom';
import { Input } from 'components/Form/Input/styled';
import * as GS from 'constants/globalStyles';
import { PlainButton } from 'components/Form/Button/PlainButton';
import { faDownload, faPlus, faTrashCan } from '@fortawesome/pro-light-svg-icons';
import { ChangeEvent, MouseEvent, useRef } from 'react';
import { downloadAsync, uploadProjectAttachmentAsync } from 'utils/file';
import { toast } from 'react-toastify';
import { IconButton } from '../../../../../components/Form/Button/IconButton';
import { DeleteButton } from '../../../../../components/Form/Button/DeleteButton';
import useModal from '../../../../../utils/hooks/useModal';

export const EditProjectAttachments = () => {
  const { editId } = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const modal = useModal();

  const { t } = useTranslation(['portal', 'form', 'common']);

  const [getFiles, { data, loading }] = useApi<FileLinksResponse>();
  const [deleteAttachment] = useApi<FileLinksResponse>();

  useEffectAsync(async () => {
    await refetch();
  }, [editId]);

  const refetch = async () => {
    if (editId) {
      await getFiles(() => API.ProjectsApi.fineProjectManagerApiProjectsIdAttachmentsGet(editId));
    }
  };

  const addFiles = async (files: File[]) => {
    if (!files) return;

    const projectId = editId as string;

    if (!projectId) return;

    for (const file of files) {
      await uploadProjectAttachmentAsync(projectId, file);
    }

    toast.success(t('portal:projects.create.attachmentsDone'));

    await refetch();
  };

  const addFile = async (file: File) => {
    if (!file) return;

    const projectId = editId as string;

    if (!projectId) return;

    await uploadProjectAttachmentAsync(projectId, file);

    toast.success(t('portal:projects.create.attachmentDone'));

    await refetch();
  };

  const deleteFile = (key: string) => async (_e: MouseEvent<HTMLButtonElement>) => {
    if (!key) return;

    const projectId = editId as string;

    if (!projectId) return;

    modal.closeModal();

    await deleteAttachment(() =>
      API.ProjectsApi.fineProjectManagerApiProjectsIdAttachmentsKeyDelete(projectId, key)
    );

    toast.success(t('portal:projects.edit.attachmentRemoved'));

    await refetch();
  };

  const onDownloadJob = (r: FileOperationResponse) => async (_e: MouseEvent<HTMLButtonElement>) => {
    await downloadAsync(r.link);

    toast.success(t('portal:projects.edit.attachmentDownloaded'));
  };

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

export default EditProjectAttachments;
