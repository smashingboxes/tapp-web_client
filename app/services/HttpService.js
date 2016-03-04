import axios from 'axios';
import base64 from 'base-64';

class HttpService {
  accessBrightWolf(endpoint) {
    const encodedHeader = 'Basic ' + base64.encode('brandon.mathis:sb2015');
    const brightWolfInstance = axios;

    brightWolfInstance.defaults.baseURL = 'http://bw-c2230-002.bright-wolf.net/';
    brightWolfInstance.defaults.headers.common.authorization = encodedHeader;
    return brightWolfInstance
      .get(`http://bw-c2230-002.bright-wolf.net/${endpoint}`);
  }

  accessHost(endpoint) {
    const hostUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '';

    return axios
      .get(`${hostUrl + endpoint}`);
  }
}

export default HttpService;
