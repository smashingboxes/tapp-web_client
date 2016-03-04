import { expect } from 'chai';
import faker from 'faker';
import SensorStore from './SensorStore';

describe('SensorStore', () => {
  const expectedHistory = {
    queryresult: {
      matches: [
        {
          analog_channel_1: faker.random.number(),
          report_time: faker.date.past()
        }
      ]
    }
  };

  describe('getCurrentSensorHistory and setCurrentSensorHistory', () => {
    it('gets a blank sensor before any are added', () => {
      const sensor = SensorStore.getCurrentSensorHistory();
      expect(sensor).to.deep.equal([]);
    });

    it('can set (and then get) the sensor sensorHistory', () => {
      SensorStore.setCurrentSensorHistory({ sensorHistory: expectedHistory });
      const sensorHistory = SensorStore.getCurrentSensorHistory();
      expect(sensorHistory).to.equal(expectedHistory);
    });
  });

  describe('resetSensorStore', () => {
    beforeEach(() => {
      SensorStore.setCurrentSensorHistory({ sensorHistory: expectedHistory });
      SensorStore.resetSensorStore();
    });

    it('resets the sensor store', () => {
      const sensorHistory = SensorStore.getCurrentSensorHistory();
      expect(sensorHistory).to.deep.equal([]);
    });
  });
});
