import * as API from 'api/generated';
import axios from 'axios';

export const axiosInstance = axios.create({
  withCredentials: true
});

export const config = new API.Configuration({
  basePath: process.env.REACT_APP_BACKEND_API
});

export const RestApi = {
  ProjectsApi: new API.ProjectsApi(config, undefined, axiosInstance),
  JobsApi: new API.JobsApi(config, undefined, axiosInstance),
  UsersApi: new API.UsersApi(config, undefined, axiosInstance),
  ApplicationsApi: new API.ApplicationsApi(config, undefined, axiosInstance),
  JobTranslationsApi: new API.JobTranslationsApi(config, undefined, axiosInstance)
};

export default RestApi;
