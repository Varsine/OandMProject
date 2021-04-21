import axios from 'axios';

import configs from '~/env.config';

const defaultOptions = {
  baseURL: configs.API,
};

const axiosInstance = axios.create(defaultOptions);

export default axiosInstance;
