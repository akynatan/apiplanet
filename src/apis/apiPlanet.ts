/* eslint-disable no-param-reassign */
import axios from 'axios';
import ErrorsRepository from '@repositories/ErrorsRepository';

const apiPlanet = axios.create({
  baseURL: 'http://192.168.201.9/api/v1/discadora/',
});

apiPlanet.interceptors.response.use(
  response => response,
  async error => {
    const errorRepository = new ErrorsRepository();
    const errorObject: any = {};
    if (error.response) {
      errorObject.data = error.response.data;
      errorObject.status = error.response.status;
      errorObject.headers = error.response.headers;
      errorObject.url = `${
        error.response.config.baseURL + error.response.config.url
      }`;
    }

    errorRepository.create({
      name: 'api planet',
      exception: `${error}!!!!!!${JSON.stringify(errorObject)}`,
      instance_id: '',
      instance_name: '',
    });
  },
);

apiPlanet.defaults.headers.Authorization = `11111`;

export default apiPlanet;
