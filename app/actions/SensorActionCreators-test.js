import { expect } from 'chai';
import faker from 'faker';
import { stub } from 'sinon';
import axios from 'axios';
import moment from 'moment';
import SensorActionCreators from './SensorActionCreators';
import constants from '../constants';
import AppDispatcher from '../services/AppDispatcher';

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
  let sensorOrganization;
  let sensor;
  let get;

  before(() => {
    sensorOrganization = expectedOrganizationCollection.organizations[0];
    sensor = sensorOrganization.sensors_collection.sensors[0];
  });

  describe('getSensorOrganization', () => {
    let getSensorOrganization;

    before(() => {
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
    });

    after(() => {
      get.restore();
    });
  });

  describe('getSensor', () => {
    let getSensor;

    before(() => {
      get = stub(axios, 'get');
      get.withArgs('/api/organizations').returns(Promise.resolve({ organizations_collection: expectedOrganizationCollection }));
      get.withArgs(`/api/sensors?org_id=${sensorOrganization.id}`).returns(Promise.resolve({ sensors_collection: sensorOrganization.sensors_collection }));
    });

    beforeEach(() => {
      getSensor = SensorActionCreators.getSensor();
    });

    it('first calls getSensorOrganization', () => {
      const endPoint = get.firstCall.args[0];
      expect(endPoint).to.equal(`/api/organizations`);
    });

    it('requests the sensor from Bright Wolf', () => {
      return getSensor.then(() => {
        const endPoint = get.secondCall.args[0];
        expect(endPoint).to.equal(`/api/sensors?org_id=${sensorOrganization.id}`);
      });
    });

    it('returns the sensor organization', () => {
      return getSensor.then((data) => {
        expect(data).to.deep.equal(sensor);
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
    let expectedUrl;

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
      expectedUrl = `/api/sensors/history?sensor_id=${sensor.sensor_id}&from=${moment().subtract('1', 'days').toISOString()}`;

      get.withArgs('/api/organizations').returns(Promise.resolve({ organizations_collection: expectedOrganizationCollection }));
      get.withArgs(`/api/sensors?org_id=${sensorOrganization.id}`).returns(Promise.resolve({ sensors_collection: sensorOrganization.sensors_collection }));
      get.onCall(2).returns(Promise.resolve(expectedHistory));
      // get.withArgs(expectedUrl).returns(Promise.resolve({ expectedHistory }));
    });

    beforeEach(() => {
      getSensorHistory = SensorActionCreators.getSensorHistory();
    });

    it('calls both getSensorOrganization and getSensor', () => {
      return getSensorHistory.then(() => {
        const firstEndPoint = get.firstCall.args[0];
        const secondEndPoint = get.secondCall.args[0];

        expect(firstEndPoint).to.equal(`/api/organizations`);
        expect(secondEndPoint).to.equal(`/api/sensors?org_id=${sensorOrganization.id}`);
      });
    });

    it('requests the sensor history from Bright Wolf', () => {
      return getSensorHistory.then(() => {
        const endpoint = get.thirdCall.args[0];

        expect(endpoint).to.contain(`/api/sensors/history?sensor_id=${sensor.sensor_id}&from=`);
      });
    });

    it('dispatches the sensor history', () => {
      return getSensorHistory.then(() => {
        const { actionType, payload } = dispatch.firstCall.args[0];

        expect(actionType).to.equal(constants.SENSOR_HISTORY_VIEW);
        expect(payload).to.deep.equal({ sensorHistory: expectedHistory.queryresult.matches[0] });
      });
    });

    afterEach(() => {
      // foo.reset();
      // bar.reset();
      get.reset();
      dispatch.reset();
    });

    after(() => {
      get.restore();
      dispatch.restore();
    });
  });
});
