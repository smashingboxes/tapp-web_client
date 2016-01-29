import { expect } from 'chai';
import faker from 'faker';
import { stub } from 'sinon';
import axios from 'axios';
import SensorActionCreators from './SensorActionCreators';
// import AppDispatcher from '../services/AppDispatcher';

describe('SensorActionCreators', () => {
  const expectedOrganizationCollection = {
    organizations: [
      {
        id: faker.random.number()
      }
    ]
  };

  describe('getSensorOrganization', () => {
    let get;
    let promise;
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

    it('returns the sensor organization', () => {
      return promise.then((data) => {
        expect(data).to.deep.equal(expectedOrganizationCollection.organizations[0]);
      });
    });

    afterEach(() => {
      get.reset();
      // dispatch.reset();
    });

    after(() => {
      get.restore();
      // dispatch.restore();
    });
  });

  describe('getSensor', () => {
    const expectedSensorCollection = {
      sensors: [
        {
          sensor_id: faker.random.number()
        }
      ]
    };
    let get;
    let getSensorOrganization;
    // let promise;

    before(() => {
      get = stub(axios, 'get', () => Promise.resolve({ sensors_collection: expectedSensorCollection }));
      // console.log(expectedOrganizationCollection);
      getSensorOrganization = stub(SensorActionCreators, 'getSensorOrganization', () => Promise.resolve({ organizations_collection: expectedOrganizationCollection }));
      // getSensorOrganization = stub(SensorActionCreators, 'getSensorOrganization', () => { id: expectedOrganizationCollection.organizations[0].id });
    });

    beforeEach(() => {
      SensorActionCreators.getSensor();
    });

    it('first calls getSensorOrganization', () => {
      const endPoint = get.firstCall.args[0];
      expect(endPoint).to.equal(`/api/organizations`);
    });

    it('requests the sensor from Bright Wolf', () => {
      const endPoint = get.secondCall.args[0];
      // console.log(getSensorOrganization);
      // console.log(getSensorOrganization.first_call.args);
      console.log(getSensorOrganization);
      const organizationId = getSensorOrganization.id;
      expect(endPoint).to.equal(`/api/sensors?org_id=${organizationId}`);
    });
    //
    // it('returns the sensor organization', () => {
    //   return promise.then((data) => {
    //     expect(data).to.deep.equal(expectedOrganizationCollection.organizations[0]);
    //   });
    // });

    afterEach(() => {
      get.reset();
    });

    after(() => {
      get.restore();
    });
  });
});
