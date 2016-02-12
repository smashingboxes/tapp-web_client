import axios from 'axios';
import AppDispatcher from '../services/AppDispatcher';
import constants from '../constants';

function getCurrentPoll() {
  return axios
    .get('api/poll')
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
