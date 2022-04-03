import { FileLinksResponse, FileOperationResponse } from 'api/generated';
import { useTranslation } from 'react-i18next';
import { useApi } from 'utils/hooks/useApi';
import { useEffectAsync } from 'utils/useEffectAsync';
import API from 'utils/api';
import { useParams } from 'react-router-dom';
import { MouseEvent } from 'react';
import { downloadAsync, uploadProjectAttachmentAsync } from 'utils/file';
import { toast } from 'react-toastify';
import useModal from 'utils/hooks/useModal';
import { EditAttachments } from 'components/Attachments';

export const EditProjectAttachments = () => {
  const modal = useModal();
  const { editId } = useParams();

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

    toast.success(t('portal:attachments.attachmentsDone'));

    await refetch();
  };

  const addFile = async (file: File) => {
    if (!file) return;

    const projectId = editId as string;

    if (!projectId) return;

    await uploadProjectAttachmentAsync(projectId, file);

    toast.success(t('portal:attachments.attachmentDone'));

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

    toast.success(t('portal:attachments.attachmentRemoved'));

    await refetch();
  };

  const onDownloadJob = (r: FileOperationResponse) => async (_e: MouseEvent<HTMLButtonElement>) => {
    const response = await window.API.invoke('SAVE_DIALOG', r);

    if (!response) return;

    const path = response.filePaths[0];

    if (!path) return;

    await downloadAsync(r.link, path);

    toast.success(t('portal:attachments.attachmentDownloaded'));
  };

  return (
    <EditAttachments
      addFiles={addFiles}
      addFile={addFile}
      deleteFile={deleteFile}
      onDownloadJob={onDownloadJob}
      loading={loading}
      data={data}
    />
  );
};

export default EditProjectAttachments;
