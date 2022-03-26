import * as API from 'api/generated';
import axios from 'axios';

export const axiosInstance = axios.create({
    withCredentials: true,
});

export const config = new API.Configuration({
    basePath: "http://fpm-env.eba-bqfb7ppx.eu-central-1.elasticbeanstalk.com"
});

export const RestApi = {
    ProjectsApi: new API.ProjectsApi(config, undefined, axiosInstance),
    JobsApi: new API.JobsApi(config, undefined, axiosInstance),
    UsersApi: new API.UsersApi(config, undefined, axiosInstance),
};

export default RestApi;
