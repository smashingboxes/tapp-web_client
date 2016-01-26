import axios from 'axios';

function setUpHostname(config) {
  const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '';

  config.url = host + config.url;

  return config;
}

export {
  setUpHostname
};

export default {
  init: () => {
    axios.interceptors.request.use(setUpHostname);
  }
};
