import { expect } from 'chai';
import faker from 'faker';
import { stub } from 'sinon';
import axios from 'axios';
import SensorActionCreators from './SensorActionCreators';
// import AppDispatcher from '../services/AppDispatcher';

describe('SensorActionCreators', () => {
  describe('getSensorOrganization', () => {
    const expectedOrganizationCollection = {
      organizations: [
        {
          id: faker.random.number()
        }
      ]
    };
    let get;
    // let dispatch;

    before(() => {
      // dispatch = stub(AppDispatcher, 'dispatch');
      get = stub(axios, 'get', () => Promise.resolve({ organizations_collection: expectedOrganizationCollection }));
    });

    beforeEach(() => {
      promise = SensorActionCreators.getSensorOrganization();
    });

    it('requests the sensor organization from Bright Wolf', () => {
      const endPoint = get.firstCall.args[0];
      expect(endPoint).to.equal(`/api/organizations`);
    });

    it('returns an organization collection', () => {
      return promise.then((data) => {
        // const { actionType, payload } = dispatch.firstCall.args[0];

        // expect(actionType).to.equal(constants.SEE);
        expect(data).to.deep.equal(expectedOrganizationCollection);
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
