import React, { Component } from 'react';
import CustomPropTypes from '../utils/CustomPropTypes';
import SiteHeader from './SiteHeader';

const propTypes = {
  children: CustomPropTypes.children
};

class TappRoot extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SiteHeader />
        {this.props.children}
      </div>
    );
  }
}

TappRoot.propTypes = propTypes;

export default TappRoot;
