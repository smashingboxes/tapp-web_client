import { sensorHttpClient } from '../services/sensorHttpClient';
import moment from 'moment';
// import axios from 'axios';

// console.log(sensorHttpClient);
function getSensorOrganization() {
  console.log('second')
  return sensorHttpClient('/api/organizations')
    .then(( data ) => {
      console.log('third');
      console.log(data);
      return { sensorOrganization: data.organizations_collection.organizations[0] };
    })
    .catch((response) => {
      console.log('second');
      console.log(response);
    });
}

function getSensor() {
  console.log('first')
  return getSensorOrganization()
    .then((data) => {
      console.log('fourth');
      console.log(data);
      return sensorHttpClient(`/api/sensors?org_id=${data.sensorOrganization.id}`)
        .then((sensorsCollectionData) => {
          console.log(sensorsCollectionData);
          // console.log(sensorsCollection.sensors);
          // console.log(sensorsCollection.sensors[0]);
          return sensorsCollectionData.sensors_collection.sensors[0];
        });
    });
}

function getSensorHistory() {
  return getSensor()
    .then((sensor) => {
      console.log('&&&&&&&&&&&&&&&&&&');
      console.log(sensor);
      console.log(sensor.sensor_id);
      return sensorHttpClient(`/api/sensors/history?sensor_id=${sensor.sensor_id}&from=${moment().subtract('1', 'days').toISOString()}`)
        .then((data) => {
          console.log(data);
          return { sensorHistory: data.queryresult.matches };
        });
    });
}

export default {
  getSensorOrganization,
  getSensor,
  getSensorHistory
};
