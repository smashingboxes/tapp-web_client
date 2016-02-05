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
        id: faker.random.number(),
        sensors_collection: {
          sensors: [
            {
              sensor_id: faker.random.number()
            }
          ]
        }
      }
    ]
  };

  describe('getSensorOrganization', () => {
    let get;
    let getSensorOrganization;
    // let dispatch;

    before(() => {
      // dispatch = stub(AppDispatcher, 'dispatch');
      get = stub(axios, 'get', () => Promise.resolve({ organizations_collection: expectedOrganizationCollection }));
    });

    beforeEach(() => {
      getSensorOrganization = SensorActionCreators.getSensorOrganization();
    });

    it('requests the sensor organization from Bright Wolf', () => {
      const endPoint = get.firstCall.args[0];
      expect(endPoint).to.equal(`/api/organizations`);
    });

    it('returns the sensor organization', () => {
      return getSensorOrganization.then((data) => {
        expect(data.sensorOrganization).to.deep.equal(expectedOrganizationCollection.organizations[0]);
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
    let get;
    let get2;
    let getSensorOrganization;
    let foo;
    let sensor;
    let getSensor;
    // let promise;

    before(() => {
      foo = {
        id: faker.random.number(),
        sensors_collection: {
          sensors: [
            {
              sensor_id: faker.random.number()
            }
          ]
        }
      }
      sensor = foo.sensors_collection.sensors[0];
      // foo = {
      //     sensors: [
      //       {
      //         sensor_id: faker.random.number()
      //       }
      //     ]
      // }
      get = stub(axios, 'get', () => Promise.resolve({ sensorOrganization: foo }));
              // .onSecondCall().returns(Promise.resolve({ sensor: sensor }));
      // console.log(expectedOrganizationCollection);
      // getSensorOrganization = stub(SensorActionCreators, 'getSensorOrganization', () => Promise.resolve({ sensorOrganization: foo }));
      // getSensorOrganization = stub(SensorActionCreators, 'getSensorOrganization', () => { id: expectedOrganizationCollection.organizations[0].id });
    });

    beforeEach(() => {
      getSensor = SensorActionCreators.getSensor();
    });

    it('first calls getSensorOrganization', () => {
      const endPoint = get.firstCall.args[0];
      expect(endPoint).to.equal(`/api/organizations`);
    });

    it('requests the sensor from Bright Wolf', () => {
      getSensor.then(() => {
        const endPoint = get.secondCall.args[0];
        expect(endPoint).to.equal(`/api/sensors?org_id=${foo.id}`);
      });
      // console.log(getSensorOrganization);
      // console.log(getSensorOrganization.first_call.args);
      // console.log(getSensorOrganization);
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
