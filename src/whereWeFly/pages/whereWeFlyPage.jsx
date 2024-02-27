// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router';
import withRouterHandler from 'src/shared/enhancers/withRouterHandler';
import AirportList from 'src/airports/components/airportList';
import SubHeader from 'src/shared/components/subHeader';
import WhereWeFlyConstants from 'src/whereWeFly/constants/whereWeFlyConstants';
import * as AirportsActions from 'src/airports/actions/airportsActions';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';

import type { AirportType, Push } from 'src/shared/flow-typed/shared.types';

type Props = {
  allAirports: Array<AirportType>,
  recentlySearched: Array<AirportType>,
  loadAirportsFn: () => void,
  loadRecentlySearchedFn: () => void,
  push: Push
};

export class WhereWeFlyPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const { loadAirportsFn, loadRecentlySearchedFn } = this.props;

    loadAirportsFn();
    loadRecentlySearchedFn();
  }
  _onAirportSelect = (airport: AirportType) => {
    const { push } = this.props;

    push(`/airport-info/${airport.code}`);
  };

  render() {
    const { allAirports, recentlySearched } = this.props;

    return (
      <div data-qa="whereWeFly-airport-selector">
        <SubHeader title={WhereWeFlyConstants.TITLE} />
        <AirportList
          hideSearchBarHeader
          allAirports={allAirports}
          recentlySearched={recentlySearched}
          onAirportSelect={this._onAirportSelect}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allAirports: _.get(state, 'app.airports.allAirports'),
  recentlySearched: _.get(state, 'app.airports.recentlySearched')
});

const mapDispatchToProps = {
  loadAirportsFn: AirportsActions.loadAirports,
  loadRecentlySearchedFn: AirportsActions.loadRecentlySearched
};

const enhancers = _.flowRight(
  withRouter,
  withRouterHandler,
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(WhereWeFlyPage);
