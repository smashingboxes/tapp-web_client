import { expect } from 'chai';
import faker from 'faker';
import { stub } from 'sinon';
import axios from 'axios';
import SensorActionCreators from './SensorActionCreators';
import constants from '../constants';
import AppDispatcher from '../services/AppDispatcher';

describe('SensorActionCreators', () => {
  const brightWolfUrl = 'http://bw-c2230-002.bright-wolf.net';
  const expectedOrganizationCollection = {
    organizations_collection: {
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
    }
  };
  const sensorOrganization = expectedOrganizationCollection.organizations_collection.organizations[0];
  const sensor = sensorOrganization.sensors_collection.sensors[0];
  let get;

  describe('getSensorOrganization', () => {
    let getSensorOrganization;

    before(() => {
      get = stub(axios, 'get', () => Promise.resolve({ data: expectedOrganizationCollection }));
    });

    beforeEach(() => {
      getSensorOrganization = SensorActionCreators.getSensorOrganization();
    });

    it('requests the sensor organization from Bright Wolf', () => {
      const endPoint = get.firstCall.args[0];
      expect(endPoint).to.equal(`${brightWolfUrl}/api/organizations`);
    });

    it('returns the sensor organization', () => {
      return getSensorOrganization.then((data) => {
        expect(data.sensor_organization).to.deep.equal(sensorOrganization);
      });
    });

    afterEach(() => {
      get.reset();
    });

    after(() => {
      get.restore();
    });
  });

  describe('getSensor', () => {
    let getSensor;

    before(() => {
      get = stub(axios, 'get');
      get.withArgs(`${brightWolfUrl}/api/organizations`).returns(Promise.resolve({ data: expectedOrganizationCollection }));
      get.withArgs(`${brightWolfUrl}/api/sensors?org_id=${sensorOrganization.id}`).returns(Promise.resolve({ data: sensorOrganization }));
    });

    beforeEach(() => {
      getSensor = SensorActionCreators.getSensor();
    });

    it('first calls getSensorOrganization', () => {
      const endPoint = get.firstCall.args[0];
      expect(endPoint).to.equal(`${brightWolfUrl}/api/organizations`);
    });

    it('requests the sensor from Bright Wolf', () => {
      return getSensor.then(() => {
        const endPoint = get.secondCall.args[0];
        expect(endPoint).to.equal(`${brightWolfUrl}/api/sensors?org_id=${sensorOrganization.id}`);
      });
    });

    it('returns the sensor organization', () => {
      return getSensor.then((data) => {
        expect(data.sensor).to.deep.equal(sensor);
      });
    });

    afterEach(() => {
      get.reset();
    });

    after(() => {
      get.restore();
    });
  });

  describe('getSensorHistory', () => {
    let getSensorHistory;
    let expectedHistory;
    let dispatch;

    before(() => {
      expectedHistory = {
        queryresult: {
          matches: [
            {
              analog_channel_1: faker.random.number(),
              report_time: faker.date.past()
            }
          ]
        }
      };
      dispatch = stub(AppDispatcher, 'dispatch');
      get = stub(axios, 'get');

      get.withArgs(`${brightWolfUrl}/api/organizations`).returns(Promise.resolve({ data: expectedOrganizationCollection }));
      get.withArgs(`${brightWolfUrl}/api/sensors?org_id=${sensorOrganization.id}`).returns(Promise.resolve({ data: sensorOrganization }));
      get.onCall(2).returns(Promise.resolve({ data: expectedHistory }));
    });

    beforeEach(() => {
      getSensorHistory = SensorActionCreators.getSensorHistory();
    });

    it('calls both getSensorOrganization and getSensor', () => {
      return getSensorHistory.then(() => {
        const firstEndPoint = get.firstCall.args[0];
        const secondEndPoint = get.secondCall.args[0];

        expect(firstEndPoint).to.equal(`${brightWolfUrl}/api/organizations`);
        expect(secondEndPoint).to.equal(`${brightWolfUrl}/api/sensors?org_id=${sensorOrganization.id}`);
      });
    });

    it('requests the sensor history from Bright Wolf', () => {
      return getSensorHistory.then(() => {
        const endpoint = get.thirdCall.args[0];

        expect(endpoint).to.contain(`${brightWolfUrl}/api/sensors/history?sensor_id=${sensor.sensor_id}&from=`);
      });
    });

    it('dispatches the sensor history', () => {
      return getSensorHistory.then(() => {
        const { actionType, payload } = dispatch.firstCall.args[0];

        expect(actionType).to.equal(constants.CURRENT_SENSOR_HISTORY_VIEW);
        expect(payload).to.deep.equal({ history: expectedHistory.queryresult.matches[0] });
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
