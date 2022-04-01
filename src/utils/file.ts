import axios, { AxiosResponse } from 'axios';

import { FileOperationResponse } from '../api/generated';
import API from './api';

export const uploadApplicationIconAsync = async (applicationId: string, file: File) => {
  const response: AxiosResponse<FileOperationResponse> =
    await API.ApplicationsApi.fineProjectManagerApiApplicationsUploadIconPost({
      applicationId: applicationId,
      suffix: file.name.substring(file.name.lastIndexOf('.'))
    });

  if (response.status === 200) {
    const link = response.data.link;

    if (!link) return;

    const putResponse = await axios.put(link, file, {
      headers: {
        'Content-Type': file.type
      }
    });

    if (putResponse.status === 200) {
      return true;
    }
  }

  return false;
};

export const uploadProjectAttachmentAsync = async (projectId: string, file: File) => {
  const response: AxiosResponse<FileOperationResponse> =
    await API.ProjectsApi.fineProjectManagerApiProjectsUploadAttachmentPost({
      projectId: projectId,
      fileName: file.name
    });

  const link = response.data.link;

  if (!link) return;

  await axios.put(link, file, {
    headers: {
      'Content-Type': file.type
    }
  });
};

export const downloadAsync = async (link: string, dir: string) => {
  try {
    const response = await fetch(link);

    const blob = await response.blob();

    await saveBlobToFile(blob, dir);
  } catch (e) {}
};

const saveBlobToFile = async (blob: Blob, path: string) => {
  const fs = window.API.fs;

  const fileData = new Int8Array(await blob.arrayBuffer());

  await fs.writeFileSync(path, fileData);
};
