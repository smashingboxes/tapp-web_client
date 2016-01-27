import { expect } from 'chai';
// import faker from 'faker';
import { stub } from 'sinon';
import BeerOptions from './BeerOptions';
import PollActionCreators from '../actions/PollActionCreators';

describe('BeerOptions', () => {
  describe('setPollState', () => {
    it('gets the poll data from the store', () => {

    });
  });

  describe('LoadPoll', () => {
    let beerOptions;
    let getCurrentPoll;

    before(() => {
      beerOptions = new BeerOptions();
      getCurrentPoll = stub(PollActionCreators, 'getCurrentPoll', () => {
        return Promise.resolve();
      });
    });

    it('will call getCurrentPoll', () => {
      beerOptions.loadPoll();
      expect(getCurrentPoll.calledOnce).to.be.true;
    });
  });
});
