import { sensorHttpClient } from '../services/sensorHttpClient';
// import axios from 'axios';

// console.log(sensorHttpClient);
function getSensorOrganization() {
  return sensorHttpClient('/api/organizations')
    .then(( data ) => {
      // return "+++++++++++++++++++++++++++++++++";
      // console.log("+++++++++");
      // console.log(data.organizations_collection.organizations[0].id);
      // console.log("+++++++++");
      // console.log(data.organizations_collection.organizations[0].id);
      return data.organizations_collection.organizations[0];
    })
    .catch((response) => {
      console.log(response);
    });
}

// function viewSensorOrganization() {
//   return getSensorOrganization()
//     .then((data) => {
//       return data;
//     });
// }

function getSensor() {
  // console.log('+++++++++');
  // console.log(viewSensorOrganization());
  // console.log('+++++++++');
  const organizationId = getSensorOrganization().id;
  return sensorHttpClient(`/api/sensors?org_id=${organizationId}`)
    .then((data) => {
      return data;
    });
}

export default {
  getSensorOrganization,
  getSensor
};
