import { FileLinksResponse, FileOperationResponse } from 'api/generated';
import { EditAttachments } from 'components/Attachments';
import { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from 'utils/api';
import { downloadAsync, uploadJobsAttachmentAsync } from 'utils/file';
import { useApi } from 'utils/hooks/useApi';
import useModal from 'utils/hooks/useModal';
import { useEffectAsync } from 'utils/useEffectAsync';

const JobEditAttachments = () => {
  const modal = useModal();
  const { editId } = useParams();
  const [dataToShow, setDataToShow] = useState<FileOperationResponse[]>([]);

  const { t } = useTranslation( ['portal', 'form', 'common'] );

  const [getFiles, { data, loading }] = useApi<FileLinksResponse>();
  const [deleteAttachment] = useApi<FileLinksResponse>();

  useEffectAsync( async () => {
    await refetch();
  }, [editId] );

  useEffectAsync( async () => {
    setDataToShow( data?.files ? data.files : [] );
  }, [data] );

  const refetch = async () => {
    if ( editId ) {
      await getFiles( () => API.JobsApi.fineProjectManagerApiJobsIdAttachmentsGet( editId ) );
    }
  };

  const addFiles = async ( files: File[] ) => {
    if ( !files ) return;

    const jobId = editId as string;

    if ( !jobId ) return;

    for ( const file of files ) {
      await uploadJobsAttachmentAsync( jobId, file );
    }

    toast.success( t( 'portal:attachments.attachmentsDone' ) );

    await refetch();
  };

  const addFile = async ( file: File ) => {
    if ( !file ) return;

    const jobId = editId as string;

    if ( !jobId ) return;

    await uploadJobsAttachmentAsync( jobId, file );

    toast.success( t( 'portal:attachments.attachmentDone' ) );

    await refetch();
  };

  const deleteFile = ( key: string ) => async ( _e: MouseEvent<HTMLButtonElement> ) => {
    if ( !key ) return;

    const jobId = editId as string;

    if ( !jobId ) return;

    modal.closeModal();

    await deleteAttachment( () =>
      API.JobsApi.fineProjectManagerApiJobsIdAttachmentsKeyDelete( jobId, key )
    );

    toast.success( t( 'portal:attachments.attachmentRemoved' ) );

    await refetch();
  };

  const onDownloadJob = ( r: FileOperationResponse ) => async ( _e: MouseEvent<HTMLButtonElement> ) => {
    const response = await window.API.invoke( 'SAVE_DIALOG', r );

    if ( !response ) return;

    const path = response.filePaths[0];

    if ( !path ) return;

    await downloadAsync( r.link, path );

    toast.success( t( 'portal:attachments.attachmentDownloaded' ) );
  };

  const onSearch = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const query = event.target.value.toUpperCase();
    setDataToShow( data?.files ? data.files.filter( e => e.fullName.toUpperCase().includes( query ) ) : [] );
  };

  return (
    <EditAttachments
      addFiles={addFiles}
      addFile={addFile}
      deleteFile={deleteFile}
      onDownloadJob={onDownloadJob}
      loading={loading}
      data={dataToShow}
      onSearch={onSearch}
    />
  );
};

export default JobEditAttachments;
