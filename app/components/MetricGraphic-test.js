import MG from 'metrics-graphics';
import { expect } from 'chai';
import faker from 'faker';
import MetricGraphic from './MetricGraphic';

describe('MetricGraphic', () => {
  const readings = [];

  before(() => {
    for (const i of Array(200).keys()) {
      readings.push({
        analog_channel_1: faker.random.number(i),
        report_time: faker.date.past()
      });
    }
  });

  describe('createDataGraphic', () => {
    let createDataGraphic;
    let expectedMetricGraph;
    let expectedData;

    before(() => {
      expectedData = readings.slice(Math.max(readings.size - 100, 1));
      expectedData = expectedData.map((reading) => {
        reading.time_object = new Date(reading.report_time);
        return reading;
      });

      expectedMetricGraph = MG.data_graphic({
        // # title: "Pours"
        description: 'tapp pours',
        data: expectedData,
        width: 1000,
        height: 250,
        target: '#chart',
        x_accessor: 'time_object',
        y_accessor: 'analog_channel_1'
      });
    });

    beforeEach(() => {
      const metricGraphic = new MetricGraphic();
      metricGraphic.props = {
        sensorHistory: expectedData
      };

      createDataGraphic = metricGraphic.createDataGraphic();
    });

    it('returns a metric-graphics graph', () => {
      expect(createDataGraphic).to.deep.equal(expectedMetricGraph);
    });
  });
});
