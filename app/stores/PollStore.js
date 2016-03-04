import Immutable from 'immutable';
import AppDispatcher from '../services/AppDispatcher';
import constants from '../constants';
import { Store } from 'flux/utils';

function getInitialPollStore() {
  return new Immutable.Map({
    poll: new Immutable.Map()
  });
}

let pollStore = getInitialPollStore();

class PollStore extends Store {
  get actions() {
    return {
      [constants.CURRENT_POLL_VIEW]: this.setCurrentPoll
    };
  }

  getCurrentPoll() {
    return pollStore.get('poll');
  }

  setCurrentPoll({ poll }) {
    pollStore = pollStore.set('poll', Immutable.fromJS(poll));
  }

  resetPollStore() {
    pollStore = getInitialPollStore();
  }
}

export default new PollStore(AppDispatcher);
