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

  }

  setSensorHistory() {
    const history = SensorStore.getCurrentSensorHistory();
    this.setState({ history });
  }

  loadSensorHistory() {
    return SensorActionCreators.getSensorHistory();
  }
}

export default SensorHistory;
