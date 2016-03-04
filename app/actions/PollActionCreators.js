import AppDispatcher from '../services/AppDispatcher';
import HttpService from '../services/HttpService';
import constants from '../constants';

const accessHost = new HttpService().accessHost;

function getCurrentPoll() {
  return accessHost('api/poll')
    .then(({ data }) => {
      AppDispatcher.dispatch({
        actionType: constants.CURRENT_POLL_VIEW,
        payload: { data }
      });
    });
}

export default {
  getCurrentPoll
};
