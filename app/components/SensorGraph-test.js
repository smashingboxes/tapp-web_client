import { stub, spy } from 'sinon';
import SensorGraph from './SensorGraph';
import React, { Component } from 'react';
import { expect } from 'chai';
import faker from 'faker';
import Immutable from 'immutable';
// import MG from 'metrics-graphics';

describe('SensorGraph', () => {
  let readings = [];
  const expectedReading = {
    analog_channel_1: faker.random.number(),
    report_time: faker.date.past()
  };

  before(() => {
    for (let i of Array(200).keys()) {
      readings.push({
        analog_channel_1: faker.random.number(),
        report_time: faker.date.past()
      });
    }

    readings = new Immutable.List(readings);
  });

  describe('componentWillMount', () => {
    let setSensorHistory;

    before(() => {
      setSensorHistory = spy(SensorGraph.prototype, 'setSensorHistory');
    });

    beforeEach(() => {
      const sensorGraph = new SensorGraph();
      sensorGraph.props = {
        sensorHistory: expectedReading
      };

      sensorGraph.componentWillMount();
    });

    it('calls setSensorHistory', () => {
      expect(setSensorHistory.calledOnce).to.be.true;
    });

    afterEach(() => {
      setSensorHistory.reset();
    });

    after(() => {
      setSensorHistory.restore();
    });
  });

  describe('setSensorHistory', () => {
    let setState;

    before(() => {
      setState = stub(Component.prototype, 'setState');
    });

    beforeEach(() => {
      const sensorGraph = new SensorGraph();
      sensorGraph.props = {
        sensorHistory: expectedReading
      };

      sensorGraph.setSensorHistory();
    });

    it('sets sensorHistory based upon the params passed in', () => {
      const [{ sensorHistory }] = setState.firstCall.args;
      expect(sensorHistory).to.equal(expectedReading);
    });

    afterEach(() => {
      setState.reset();
    });

    after(() => {
      setState.restore();
    });
  });

  describe('sliceOffOldData', () => {
    let sliceOffOldData;
    let expectedNewData;

    before(() => {
      expectedNewData = readings.slice(Math.max(readings.size - 100, 1));
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
      oldReportTime = readings.first().report_time;
    });

    beforeEach(() => {
      const sensorGraph = new SensorGraph();

      addTimeObjects = sensorGraph.addTimeObjects(readings);
    });

    it('adds a time object equal to the report time of a reading', () => {
      const reading = addTimeObjects.toArray()[0];
      const reportTimeUpToMinutes = new Date(oldReportTime);

      expect(reading.time_object).to.deep.equal(reportTimeUpToMinutes);
    });
  });

  // describe('createDataGraphic', () => {
  //   let sliceOffOldData;
  //   let addTimeObjects;
  //   let createDataGraphic;
  //   let expectedMetricGraph;
  //
  //   before(() => {
  //     sliceOffOldData = spy(SensorGraph.prototype, 'sliceOffOldData');
  //     addTimeObjects = spy(SensorGraph.prototype, 'addTimeObjects');
  //     let data = readings.slice(Math.max(readings.size - 100, 1));
  //     data = data.map((reading) => {
  //       reading.time_object = new Date(reading.report_time);
  //     });
  //     expectedMetricGraph = MG.data_graphic({
  //       // # title: "Pours"
  //       description: "tapp pours",
  //       data: data,
  //       width: 1000,
  //       height: 250,
  //       target: '#chart',
  //       x_accessor: 'time_object',
  //       y_accessor: 'analog_channel_1'
  //     });
  //   });
  //
  //   beforeEach(() => {
  //     const sensorGraph = new SensorGraph();
  //     sensorGraph.state = {
  //       sensorHistory: readings
  //     };
  //
  //     createDataGraphic = sensorGraph.createDataGraphic();
  //   });
  //
  //   it('calls sliceOffOldData', () => {
  //     expect(sliceOffOldData.calledOnce).to.be.true;
  //   });
  //
  //   it('calls addTimeObjects', () => {
  //     expect(addTimeObjects.calledOnce).to.be.true;
  //   });
  //
  //   it('returns a metric-graphics graph', () => {
  //     expect(createDataGraphic).to.equal(expectedMetricGraph);
  //   });
  //
  //   afterEach(() => {
  //     sliceOffOldData.reset();
  //     addTimeObjects.reset();
  //   });
  //
  //   after(() => {
  //     sliceOffOldData.restore();
  //     addTimeObjects.restore();
  //   });
  // });
  //
  // describe('createGraph', () => {
  // });
});
