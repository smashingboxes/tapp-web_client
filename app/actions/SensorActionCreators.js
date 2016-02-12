import { sensorHttpClient } from '../services/sensorHttpClient';
import moment from 'moment';
import AppDispatcher from '../services/AppDispatcher';
import constants from '../constants';

function getSensorOrganization() {
  return sensorHttpClient('/api/organizations')
    .then(( data ) => {
      return { sensor_organization: data.organizations_collection.organizations[0] };
    })
    .catch((response) => {
      console.log(response);
    });
}

function getSensor() {
  return getSensorOrganization()
    .then((data) => {
      return sensorHttpClient(`/api/sensors?org_id=${data.sensor_organization.id}`)
        .then((sensorsCollectionData) => {
          return { sensor: sensorsCollectionData.sensors_collection.sensors[0] };
        });
    });
}

function getSensorHistory() {
  return getSensor()
    .then((foo) => {
      return sensorHttpClient(`/api/sensors/history?sensor_id=${foo.sensor.sensor_id}&from=${moment().subtract('1', 'days').toISOString()}`)
        .then((history) => {
          AppDispatcher.dispatch({
            actionType: constants.CURRENT_SENSOR_HISTORY_VIEW,
            payload: { history: history.queryresult.matches[0] }
          });
        });
    });
}

export default {
  getSensorOrganization,
  getSensor,
  getSensorHistory
};
