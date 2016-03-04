import SensorGraph from './SensorGraph';
import { spy } from 'sinon';
import { expect } from 'chai';
import faker from 'faker';

describe('SensorGraph', () => {
  const readings = [];

  before(() => {
    for (const i of Array(200).keys()) {
      readings.push({
        analog_channel_1: faker.random.number(i),
        report_time: faker.date.past()
      });
    }
  });

  describe('sliceOffOldData', () => {
    let sliceOffOldData;
    let expectedNewData;

    before(() => {
      expectedNewData = readings.slice(Math.max(readings.length - 100, 1));
    });

    beforeEach(() => {
      const sensorGraph = new SensorGraph();

      sliceOffOldData = sensorGraph.sliceOffOldData(readings);
    });

    it('removes the oldest 100 readings', () => {
      expect(sliceOffOldData).to.deep.equal(expectedNewData);
    });
  });

  describe('addTimeObjects', () => {
    let oldReportTime;
    let addTimeObjects;

    before(() => {
      oldReportTime = readings[0].report_time;
    });

    beforeEach(() => {
      const sensorGraph = new SensorGraph();

      addTimeObjects = sensorGraph.addTimeObjects(readings);
    });

    it('adds a time object equal to the report time of a reading', () => {
      const reading = addTimeObjects[0];
      const reportTimeUpToMinutes = new Date(oldReportTime);

      expect(reading.time_object).to.deep.equal(reportTimeUpToMinutes);
    });
  });

  describe('formatSensorHistory', () => {
    let sliceOffOldData;
    let addTimeObjects;
    let formatSensorHistory;
    let expectedData;

    before(() => {
      expectedData = readings.slice(Math.max(readings.length - 100, 1));
      expectedData = expectedData.map((reading) => {
        reading.time_object = new Date(reading.report_time);
        return reading;
      });

      sliceOffOldData = spy(SensorGraph.prototype, 'sliceOffOldData');
      addTimeObjects = spy(SensorGraph.prototype, 'addTimeObjects');
    });

    beforeEach(() => {
      const sensorGraph = new SensorGraph();
      sensorGraph.props = {
        sensorHistory: readings
      };

      formatSensorHistory = sensorGraph.formatSensorHistory();
    });

    it('calls sliceOffOldData', () => {
      expect(sliceOffOldData.calledOnce).to.be.true;
    });

    it('calls addTimeObjects', () => {
      expect(addTimeObjects.calledOnce).to.be.true;
    });

    it('returns a formatted sensor history array', () => {
      expect(formatSensorHistory).to.deep.equal(expectedData);
    });

    afterEach(() => {
      sliceOffOldData.reset();
      addTimeObjects.reset();
    });

    after(() => {
      sliceOffOldData.restore();
      addTimeObjects.restore();
    });
  });
});
