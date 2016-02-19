import React, { cloneElement, Component, PropTypes } from 'react';
import SensorActionCreators from '../actions/SensorActionCreators';
import SensorStore from '../stores/SensorStore';
import Immutable from 'immutable';

class SensorHistory extends Component {
  constructor() {
    super();
    this.state = {
      history: new Immutable.Map()
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
    const history = SensorStore.getCurrentSensorHistory();
    this.setState({ history });
  }

  loadSensorHistory() {
    return SensorActionCreators.getSensorHistory();
  }

  render() {
    return (
      <div>
        <p>FOO</p>
        <p>{this.state.history}</p>
        <p>{this.state.history.get('battery_level')}</p>
      </div>
    );
  }
}

export default SensorHistory;
