import SensorActionCreators from '../actions/SensorActionCreators';
import SensorHistory from './SensorHistory';
import SensorStore from '../stores/SensorStore';
import { Store } from 'flux/utils';
import React, { Component } from 'react';
import faker from 'faker';
import { stub } from 'sinon';
import { expect } from 'chai';

describe('SensorHistory', () => {
  let sensorHistory;

  describe('componentWillMount', () => {
    const expectedListener = () => {};
    let addListener;

    before(() => {
      addListener = stub(Store.prototype, 'addListener').returns(expectedListener);
    });

    beforeEach(() => {
      sensorHistory = new SensorHistory();
      sensorHistory.componentWillMount();
    });

    it('listens for changes to the SensorStore', () => {
      expect(addListener.calledOnce).to.be.true;
    });

    afterEach(() => {
      addListener.reset();
    });

    after(() => {
      addListener.restore();
    });
  });

  describe('loadSensorHistory', () => {
    let getSensorHistory;

    before(() => {
      getSensorHistory = stub(SensorActionCreators, 'getSensorHistory', () => {
        return Promise.resolve();
      });
    });

    beforeEach(() => {
      sensorHistory = new SensorHistory();
      sensorHistory.loadSensorHistory();
    });

    it('will call getSensorHistory', () => {
      expect(getSensorHistory.calledOnce).to.be.true;
    });
  });

  describe('setSensorHistory', () => {
    const expectedHistory = {
      analog_channel_1: faker.random.number(),
      report_time: faker.date.past()
    };
    let getCurrentSensorHistory;
    let setState;

    before(() => {
      getCurrentSensorHistory = stub(SensorStore, 'getCurrentSensorHistory', () => expectedHistory);
      setState = stub(Component.prototype, 'setState');
    });

    beforeEach(() => {
      sensorHistory = new SensorHistory();
      sensorHistory.setSensorHistory();
    });

    it('gets the sensor history from the sensor store', () => {
      expect(getCurrentSensorHistory.calledOnce).to.be.true;
      const analog_channel_1 = getCurrentSensorHistory.firstCall.returnValue.analog_channel_1;
      expect(analog_channel_1).to.equal(expectedHistory.analog_channel_1);
    });

    it('sets the sensor history to the state', () => {
      const [{ history }] = setState.firstCall.args;
      expect(history).to.equal(expectedHistory);
    });

    afterEach(() => {
      getCurrentSensorHistory.reset();
    });

    after(() => {
      getCurrentSensorHistory.restore();
    });
  });
});
