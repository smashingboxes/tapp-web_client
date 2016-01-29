import { sensorHttpClient } from '../services/sensorHttpClient';
import axios from 'axios';

// console.log(sensorHttpClient);
function getSensorOrganization() {
  sensorHttpClient('/api/organizations');
  // return sensorHttpClient('/organizations')
  //   .then(({ data }) => {
  //     // console.log(data);
  //   });
  // return brightWolfInstance
  //   .get('/api/poll')
  //   .then(( data ) => {
  //     console.log("+++++++++");
  //     console.log(data);
  //     console.log("+++++++++");
  //   })
  //   .catch((response) => {
  //     console.log(response);
  //   });
}

export default {
  getSensorOrganization
};
