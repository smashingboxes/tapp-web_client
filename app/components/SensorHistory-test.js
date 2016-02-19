import SensorActionCreators from '../actions/SensorActionCreators';
import SensorHistory from './SensorHistory';
import SensorStore from '../stores/SensorStore';
import { Store } from 'flux/utils';
import { Component } from 'react';
import faker from 'faker';
import { stub, spy } from 'sinon';
import { expect } from 'chai';

describe('SensorHistory', () => {
  let sensorHistory;

  describe('componentWillMount', () => {
    const expectedListener = () => {};
    let addListener;
    let loadSensorHistory;

    before(() => {
      addListener = stub(Store.prototype, 'addListener').returns(expectedListener);
      loadSensorHistory = spy(SensorHistory.prototype, 'loadSensorHistory');
    });

    beforeEach(() => {
      sensorHistory = new SensorHistory();
      sensorHistory.componentWillMount();
    });

    it('listens for changes to the SensorStore', () => {
      expect(addListener.calledOnce).to.be.true;
    });

    it('saves the listener to the component', () => {
      expect(sensorHistory.storeListener).to.equal(expectedListener);
    });

    it('calls loadSensorHistory', () => {
      expect(loadSensorHistory.calledOnce).to.be.true;
    });

    afterEach(() => {
      addListener.reset();
      loadSensorHistory.reset();
    });

    after(() => {
      addListener.restore();
      loadSensorHistory.restore();
    });
  });

  describe('componentWillUnmount', () => {
    let remove;

    before(() => {
      remove = spy();
    });

    beforeEach(() => {
      sensorHistory = new SensorHistory();
      sensorHistory.storeListener = { remove };
      sensorHistory.componentWillUnmount();
    });

    it('removes the storeListener', () => {
      expect(remove.calledOnce).to.be.true;
    });

    afterEach(() => {
      remove.reset();
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
      const analogChannel1 = getCurrentSensorHistory.firstCall.returnValue.analog_channel_1;
      expect(analogChannel1).to.equal(expectedHistory.analog_channel_1);
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
