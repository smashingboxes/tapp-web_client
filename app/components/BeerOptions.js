import React, { Component } from 'react';
import patientActionCreators from '../actions/PollActionCreators';

class BeerOptions extends Component {
  loadPoll() {
    return patientActionCreators.
      getCurrentPoll();
  }

  render() {
    return (
      <div>hey</div>
    );
  }
}

export default BeerOptions;
