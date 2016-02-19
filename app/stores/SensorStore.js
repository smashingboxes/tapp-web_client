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
  __onDispatch(action) {
    if (this.actions[action.actionType]) {
      // this.setPatients for example?
      // What's this.setPatients.call... doing?
      this.actions[action.actionType].call(this, action.payload);
      // purpose of this?
      this.__emitChange();
    }
  }

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
