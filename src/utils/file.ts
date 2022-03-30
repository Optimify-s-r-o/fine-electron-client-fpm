import axios, { AxiosResponse } from 'axios';
import API from './api';
import { FileOperationResponse } from '../api/generated';

export const uploadAsync = async (projectId: string, file: File) => {
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

export const downloadAsync = () => {};
