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
      return { sensorOrganization: data.organizations_collection.organizations[0] };
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
  // let organizationId;
  let promise;
  // console.log('+++++++++');
  // console.log(viewSensorOrganization());
  // console.log('+++++++++');
  // const organizationId = getSensorOrganization().id;
  // promise = Promise.resolve(getSensorOrganization());
  return getSensorOrganization()
    .then((sensorOrg) => {
      return sensorHttpClient(`/api/sensors?org_id=${sensorOrg.sensor_id}`)
        .then((data) => {
          console.log("#############");
          return { sensor: data };
        });
    });
}

export default {
  getSensorOrganization,
  getSensor
};
