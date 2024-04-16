/* eslint-disable no-param-reassign */
import axios from 'axios';
import https from 'https';
import authConfig from '@config/authApiHubsoft';
import ErrorsRepository from '@repositories/ErrorsRepository';

let attemps = 0;

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const apiHubsoft = axios.create({
  baseURL: 'https://api.map.hubsoft.com.br/api/v1/',
  httpsAgent: agent,
});

apiHubsoft.interceptors.response.use(
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
      name: 'api hubsoft',
      exception: `${error}!!!!!!${JSON.stringify(errorObject)}`,
      instance_id: '',
      instance_name: '',
    });

    if (attemps < 5) {
      attemps += 1;
      if (error.response.status === 401) {
        console.log('TOKEN EXPIRADO!!');
        console.log('TROCANDO O TOKEN... 3... 2... 1...');

        const paramsFetch = {
          grant_type: process.env.TOKEN_GRANT_TYPE,
          client_id: process.env.TOKEN_CLIENT_ID,
          client_secret: process.env.TOKEN_CLIENT_SECRET,
          username: process.env.TOKEN_USERNAME,
          password: process.env.TOKEN_PASSWORD,
          host: process.env.TOKEN_HOST,
        };

        try {
          const response = await apiHubsoft.post(
            `${process.env.TOKEN_HOST}/oauth/token`,
            paramsFetch,
          );

          console.log('newToken', response.data?.access_token);
          const token = response.data?.access_token;

          apiHubsoft.defaults.headers.Authorization = `Bearer ${token}`;
          attemps = 0;
        } catch (err) {
          console.log(err);
        }
      }
    }
  },
);

apiHubsoft.defaults.headers.Authorization = `Bearer ${authConfig.token}`;
apiHubsoft.defaults.headers.Accept = 'application/json';

export default apiHubsoft;
