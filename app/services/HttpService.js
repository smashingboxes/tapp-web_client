import axios from 'axios';
import base64 from 'base-64';
import DevKeysAndPasswords from '../../.DevKeysAndPasswords';

class HttpService {
  accessBrightWolf(endpoint) {
    const password = DevKeysAndPasswords.brightWolfPassword();
    const header = `brandon.mathis:${password}`;
    const encodedHeader = 'Basic ' + base64.encode(header);
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
