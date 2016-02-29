import React, { cloneElement, Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { _ } from 'underscore';
import faker from 'faker';
import './SensorGraph.scss';
import MG from 'metrics-graphics';

const propTypes = {
  sensorHistory: PropTypes.array
};

class SensorGraph extends Component {
  componentWillMount() {
    this.setSensorHistory();
  }

  setSensorHistory() {
    this.setState({ sensorHistory: this.props.sensorHistory });
  }

  sliceOffOldData(sensorHistory) {
    return sensorHistory.slice(Math.max(sensorHistory.size - 100, 1));
  }

  addTimeObjects(sensorHistory) {
    sensorHistory.map((reading) => {
      reading.time_object = new Date(reading.report_time);
    });

    return sensorHistory;
  }

  foo(bar) {
    bar.map((baz) => {
      console.log(baz.time_object);
      console.log(baz.analog_channel_1);
    });
  }

  createDataGraphic() {
    let sensorHistory = this.props.sensorHistory;
    sensorHistory = this.sliceOffOldData(sensorHistory);
    sensorHistory = this.addTimeObjects(sensorHistory);

    return MG.data_graphic({
      description: 'tapp pours',
      data: sensorHistory,
      width: 750,
      height: 250,
      target: '#chart',
      x_accessor: 'time_object',
      y_accessor: 'analog_channel_1'
    });
  }

  render() {
    return (
      <div id='chart'>
        {this.createDataGraphic()}
      </div>
    );
  }
}

SensorGraph.propTypes = propTypes;

export default SensorGraph;
