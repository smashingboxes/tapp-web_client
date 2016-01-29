import axios from 'axios';
import base64 from 'base-64';

const encodedHeader = 'Basic ' + base64.encode('brandon.mathis:sb2015');
const brightWolfInstance = axios;

function sensorHttpClient(url) {
  brightWolfInstance.defaults.baseURL = 'http://bw-c2230-002.bright-wolf.net';
  brightWolfInstance.defaults.headers.common.authorization = encodedHeader;
  return brightWolfInstance
    .get(url)
    .then(( data ) => {
      console.log("+++++++++");
      console.log(data);
      console.log("+++++++++");
    })
    .catch((response) => {
      console.log(response);
    });
}

export {
  sensorHttpClient
};
