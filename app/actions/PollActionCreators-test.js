import { expect } from 'chai';
import faker from 'faker';
import { stub } from 'sinon';
import axios from 'axios';
import AppDispatcher from '../services/AppDispatcher';
import constants from '../constants';
import PollActionCreators from './PollActionCreators';

describe('PollActionCreators', () => {
  describe('getCurrentPoll', () => {
    const poll = {
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
    let get;
    let dispatch;
    let promise;

    before(() => {
      dispatch = stub(AppDispatcher, 'dispatch');
      get = stub(axios, 'get', () => Promise.resolve({ data: poll.data }));
    });

    beforeEach(() => {
      promise = PollActionCreators.getCurrentPoll();
      // PollActionCreators.getCurrentPoll();
    });

    it('requests a the current poll', () => {
      const endPoint = get.firstCall.args[0];
      expect(endPoint).to.equal(`api/poll`);
    });

    it('dispatches the poll', () => {
      return promise.then(() => {
        const { actionType, payload } = dispatch.firstCall.args[0];

        expect(actionType).to.equal(constants.CURRENT_POLL);
        expect(payload).to.deep.equal(poll);
      });
    });

    afterEach(() => {
      get.reset();
      dispatch.reset();
    });

    after(() => {
      get.restore();
      dispatch.restore();
    });
  });
});
