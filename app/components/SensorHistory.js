import React, { Component, PropTypes } from 'react';
import SensorActionCreators from '../actions/SensorActionCreators';
import SensorStore from '../stores/SensorStore';
import SensorGraph from './SensorGraph';

const propTypes = {
  params: PropTypes.object.isRequired
};

class SensorHistory extends Component {
  constructor() {
    super();
    this.state = {
      sensorHistory: []
    };
  }

  componentWillMount() {
    this.storeListener = SensorStore.addListener(() => {
      this.setSensorHistory();
    });
    this.loadSensorHistory();
  }

  componentWillUnmount() {
    this.storeListener.remove();
  }

  setSensorHistory() {
    const sensorHistory = SensorStore.getCurrentSensorHistory();
    this.setState({ sensorHistory });
  }

  loadSensorHistory() {
    return SensorActionCreators.getSensorHistory();
  }

  render() {
    return (
      <div>
        <SensorGraph sensorHistory={this.state.sensorHistory} />
      </div>
    );
  }
}

SensorHistory.propTypes = propTypes;

export default SensorHistory;
