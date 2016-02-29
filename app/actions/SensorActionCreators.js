import HttpService from '../services/HttpService';
import moment from 'moment';
import AppDispatcher from '../services/AppDispatcher';
import constants from '../constants';

const accessBrightWolf = new HttpService().accessBrightWolf;

function getSensorOrganization() {
  return accessBrightWolf('api/organizations')
    .then(({ data }) => {
      return { sensor_organization: data.organizations_collection.organizations[0] };
    })
    .catch((response) => {
      console.log(response);
    });
}

function getSensor() {
  return getSensorOrganization()
    .then(({ sensor_organization }) => {
      return accessBrightWolf(`api/sensors?org_id=${sensor_organization.id}`)
        .then(({ data }) => {
          return { sensor: data.sensors_collection.sensors[0] };
        });
    });
}

function getSensorHistory() {
  return getSensor()
    .then(({ sensor }) => {
      return accessBrightWolf(`api/sensors/history?sensor_id=${sensor.sensor_id}&from=${moment().subtract('8', 'days').toISOString()}`)
        .then(({ data }) => {
          AppDispatcher.dispatch({
            actionType: constants.CURRENT_SENSOR_HISTORY_VIEW,
            payload: { sensorHistory: data.queryresult.matches }
          });
        });
    });
}

export default {
  getSensorOrganization,
  getSensor,
  getSensorHistory
};
