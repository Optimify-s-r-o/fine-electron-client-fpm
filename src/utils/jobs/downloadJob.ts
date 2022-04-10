import API from 'utils/api';
import { downloadAsync } from "utils/file";

export const downloadJob = (jobId: string) => async () => {
    
    const res = await API.JobsApi.fineProjectManagerApiJobsIdOpenableFileGet( jobId );
    
    const r = res.data;
  
    const response = await window.API.invoke('SAVE_DIALOG', r);

    if (!response) return;

    const path = response.filePaths[0];

    if (!path) return;

    await downloadAsync(r.link, path);
  };