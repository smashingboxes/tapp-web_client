import React, { cloneElement, Component, PropTypes } from 'react';
import SensorActionCreators from '../actions/SensorActionCreators';
import SensorStore from '../stores/SensorStore';
import Immutable from 'immutable';
import SensorGraph from './SensorGraph';
import CustomPropTypes from '../utils/CustomPropTypes';

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
        <p>FOO</p>
        <SensorGraph sensorHistory={this.state.sensorHistory} />
      </div>
    );
  }
      // <div>
      //   <p>FOO</p>
      //   <p>{this.state.sensorHistory}</p>
      //   <p>{this.state.sensorHistory.get('battery_level')}</p>
      // </div>
}

SensorHistory.propTypes = propTypes;

export default SensorHistory;
