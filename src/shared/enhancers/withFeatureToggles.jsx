// @flow

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const withFeatureToggles = (Component: *) => {
  class WithFeatureToggles extends React.Component<*> {
    render() {
      const { toggles, ...restProps } = this.props;

      return <Component {...restProps} toggles={toggles} />;
    }
  }

  const mapStateToProps = (state) => ({
    toggles: _.get(state, 'app.toggles')
  });

  return connect(mapStateToProps, {})(WithFeatureToggles);
};

export default withFeatureToggles;
