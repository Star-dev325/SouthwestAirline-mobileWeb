// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as SharedActions from 'src/shared/actions/sharedActions';

import type { ComponentType } from 'react';

const withRecentTripSearches = (featureName: string) => (Component: ComponentType<*>) => {
  class WithRecentTripSearches extends React.Component<*> {
    componentDidMount() {
      this.props.fetchRecentTripSearchesFn();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = (state) => ({
    recentTripSearches: _.get(state, `app.${featureName}.recentTripSearches`)
  });

  const mapDispatchToProps = {
    saveRecentTripSearchFn: _.curry(SharedActions.saveRecentTripSearch)(featureName),
    fetchRecentTripSearchesFn: _.partial(SharedActions.fetchRecentTripSearches, featureName)
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithRecentTripSearches);
};

export default withRecentTripSearches;
