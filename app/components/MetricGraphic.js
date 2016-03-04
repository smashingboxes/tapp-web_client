import React, { Component, PropTypes } from 'react';
import MG from 'metrics-graphics';

const propTypes = {
  sensorHistory: PropTypes.array
};

class MetricGraphic extends Component {
  createDataGraphic() {
    return MG.data_graphic({
      description: 'tapp pours',
      data: this.props.sensorHistory,
      width: 1250,
      height: 250,
      target: '#chart',
      x_accessor: 'time_object',
      y_accessor: 'analog_channel_1'
    });
  }

  render() {
    return (
      <div id="chart">
        {this.createDataGraphic()}
      </div>
    );
  }
}

MetricGraphic.propTypes = propTypes;

export default MetricGraphic;
