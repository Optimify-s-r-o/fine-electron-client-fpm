import axios, { AxiosResponse } from 'axios';

import { FileOperationResponse } from '../api/generated';
import API from './api';

export const uploadApplicationIconAsync = async ( applicationId: string, file: File ) => {
  const response: AxiosResponse<FileOperationResponse> =
    await API.ApplicationsApi.fineProjectManagerApiApplicationsUploadIconPost( {
      applicationId: applicationId,
      suffix: file.name.substring( file.name.lastIndexOf( '.' ) )
    } );

  if ( response.status === 200 ) {
    const link = response.data.link;

    if ( !link ) return;

    const putResponse = await axios.put( link, file, {
      headers: {
        'Content-Type': file.type
      }
    } );

    if ( putResponse.status === 200 ) {
      return true;
    }
  }

  return false;
};

export const uploadProjectAttachementAsync = async ( projectId: string, file: File ) => {
  const response: AxiosResponse<FileOperationResponse> =
    await API.ProjectsApi.fineProjectManagerApiProjectsUploadAttachmentPost( {
      projectId: projectId,
      fileName: file.name
    } );

  const link = response.data.link;

  if ( !link ) return;

  await axios.put( link, file, {
    headers: {
      'Content-Type': file.type
    }
  } );
};

export const downloadAsync = async ( link: string ) => {
  const response = await axios.get( link );

  if ( response?.status === 200 ) return;

  const blob = await response.data.blob();

  const path = await window.API.invoke( 'ELECTRON_STORE_GET', { name: 'downloads' } );

  await saveBlobToFile( blob, path );
};

const saveBlobToFile = async ( blob: Blob, path: string ) => {
  const fs = window.API.fs;

  const fileData = new Int8Array( await blob.arrayBuffer() );

  await fs.writeFileSync( path, fileData );
};
