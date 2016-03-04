import { expect } from 'chai';
import faker from 'faker';
import Immutable from 'immutable';
import PollStore from './PollStore';

describe('PollStore', () => {
  const expectedPoll = {
    data: {
      id: faker.random.number(),
      type: 'polls',
      attributes: {
        end_date: faker.date.future()
      },
      relationships: {
        beers: {
          data: [
            {
              id: faker.random.number(),
              type: 'beers'
            },
            {
              id: faker.random.number(),
              type: 'beers'
            }
          ]
        }
      }
    }
  };

  describe('getCurrentPoll and setCurrentPoll', () => {
    it('gets a blank poll before any are added', () => {
      const poll = PollStore.getCurrentPoll();
      expect(poll).to.equal(new Immutable.Map());
    });

    it('can set (and then get) the current poll', () => {
      PollStore.setCurrentPoll({ poll: expectedPoll });
      const poll = PollStore.getCurrentPoll();
      expect(poll).to.equal(Immutable.fromJS(expectedPoll));
    });
  });

  describe('resetPollStore', () => {
    beforeEach(() => {
      PollStore.setCurrentPoll({ poll: expectedPoll });
      PollStore.resetPollStore();
    });

    it('resets the poll store', () => {
      const poll = PollStore.getCurrentPoll();
      expect(poll).to.equal(new Immutable.Map());
    });
  });
});
