import React, { Component, PropTypes } from 'react';
import './SensorGraph.scss';
import MetricGraphic from './MetricGraphic';

const propTypes = {
  sensorHistory: PropTypes.array
};

class SensorGraph extends Component {
  sliceOffOldData(sensorHistory) {
    return sensorHistory.slice(Math.max(sensorHistory.length - 100, 1));
  }

  addTimeObjects(sensorHistory) {
    sensorHistory.map((reading) => {
      reading.time_object = new Date(reading.report_time);
      return reading;
    });

    return sensorHistory;
  }

  formatSensorHistory() {
    let sensorHistory = this.props.sensorHistory;
    sensorHistory = this.sliceOffOldData(sensorHistory);
    sensorHistory = this.addTimeObjects(sensorHistory);

    return sensorHistory;
  }

  render() {
    return (
      <div>
        <MetricGraphic sensorHistory={this.formatSensorHistory()} />
      </div>
    );
  }
}

SensorGraph.propTypes = propTypes;

export default SensorGraph;
