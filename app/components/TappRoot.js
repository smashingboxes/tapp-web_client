import React, { Component, cloneElement } from 'react';
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
        // {this.props.children && cloneElement(this.props.children)}
}

TappRoot.propTypes = propTypes;

export default TappRoot;
