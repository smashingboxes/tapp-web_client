import Immutable from 'immutable';
import AppDispatcher from '../services/AppDispatcher';
import constants from '../constants';
import { Store } from 'flux/utils';

function getInitialSensorStore() {
  return new Immutable.Map({
    sensorHistory: []
  });
}

let sensorStore = getInitialSensorStore();

class SensorStore extends Store {
  __onDispatch(action) {
    if (this.actions[action.actionType]) {
      this.actions[action.actionType].call(this, action.payload);
      this.__emitChange();
    }
  }

  get actions() {
    return {
      [constants.CURRENT_SENSOR_HISTORY_VIEW]: this.setCurrentSensorHistory
    };
  }

  getCurrentSensorHistory() {
    return sensorStore.get('sensorHistory');
  }

  setCurrentSensorHistory({ sensorHistory }) {
    sensorStore = sensorStore.set('sensorHistory', sensorHistory);
  }

  resetSensorStore() {
    sensorStore = getInitialSensorStore();
  }
}

export default new SensorStore(AppDispatcher);
