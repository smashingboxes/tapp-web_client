import Immutable from 'immutable';
import AppDispatcher from '../services/AppDispatcher';
import constants from '../constants';
import { Store } from 'flux/utils';

function getInitialSensorStore() {
  return new Immutable.Map({
    history: new Immutable.Map()
  });
}

let sensorStore = getInitialSensorStore();

class SensorStore extends Store {
  get actions() {
    return {
      [constants.CURRENT_SENSOR_HISTORY_VIEW]: this.setCurrentSensorHistory
    };
  }

  getCurrentSensorHistory() {
    return sensorStore.get('history');
  }

  setCurrentSensorHistory({ history }) {
    sensorStore = sensorStore.set('history', Immutable.fromJS(history));
  }

  resetSensorStore() {
    sensorStore = getInitialSensorStore();
  }
}

export default new SensorStore(AppDispatcher);
