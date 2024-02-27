// @flow

import i18n from '@swa-ui/locale';
import cx from 'classnames';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as FlightStatusSearchActions from 'src/flightStatus/actions/flightStatusSearchActions';
import FlightStatusDetailCard from 'src/flightStatus/components/flightStatusDetailCard';
import { shareFlightStatusDetails } from 'src/shared/actions/webViewActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import AircraftTypeFooter from 'src/shared/components/aircraftTypeFooter';
import Container from 'src/shared/components/container';
import PageHeader from 'src/shared/components/pageHeader';
import SearchFlightsSummaryHeader from 'src/shared/components/searchFlightsSummaryHeader';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';

import type { Push } from 'src/shared/flow-typed/shared.types';
import type {
  FlightSearchType,
  FlightStatusDetailsPageType,
  RecentSearchRequestType
} from 'src/flightStatus/flow-typed/flightStatus.types';

type Props = {
  AIRCRAFT_TYPE_FLIGHTSTATUS?: boolean,
  fetchFlightDetailsFn: (RecentSearchRequestType, boolean, ?Push, boolean, boolean) => *,
  flightStatusDetailsPage: {
    response: ?FlightStatusDetailsPageType
  },
  isWebView: boolean,
  query: FlightSearchType,
  shareFlightStatus: boolean,
  shareFlightStatusDetailsFn: (*) => void
};

export class FlightDetailsPage extends React.Component<Props> {
  componentDidMount() {
    if (_.isEmpty(this.props.flightStatusDetailsPage.response)) {
      const { fetchFlightDetailsFn, query } = this.props;
      const withFlightKeys = query?.flightKeys;

      fetchFlightDetailsFn(query, false, null, true, !!withFlightKeys);
    }
  }

  _onRefreshClicked = () => {
    const { fetchFlightDetailsFn, query } = this.props;
    const withFlightKeys = query?.flightKeys;

    fetchFlightDetailsFn(query, false, null, true, !!withFlightKeys);
  };

  _onShareClicked = () => {
    const { shareFlightStatusDetailsFn, flightStatusDetailsPage } = this.props;
    const shareDetails = _.get(flightStatusDetailsPage, 'response.shareDetails');

    if (shareDetails) {
      shareFlightStatusDetailsFn(shareDetails);
      raiseSatelliteEvent('share flight details');
    }
  };

  renderRefreshButton(isWebView: boolean) {
    return (
      isWebView && (
        <a className="right white normal page-header--right-button" onClick={this._onRefreshClicked}>
          {i18n('SHARED__FLIGHT_STATUS__REFRESH')}
        </a>
      )
    );
  }

  render() {
    if (_.isEmpty(this.props.flightStatusDetailsPage.response)) {
      return null;
    }

    const {
      AIRCRAFT_TYPE_FLIGHTSTATUS,
      flightStatusDetailsPage: { response },
      isWebView,
      shareFlightStatus
    } = this.props;
    const tripDescription = _.get(response, 'header.tripDescription', '');
    const from = _.get(response, 'header.from', '');
    const to = _.get(response, 'header.to', '');
    const date = _.get(response, 'header.date', '');
    const flightCards = _.get(response, 'flightCards', []);

    return (
      <div className="flight-details">
        <PageHeader noBottomPadding>
          <span className={cx({ 'page-title': !isWebView }, { hide: isWebView })}>Flight Status</span>
          <span className={cx('page-title-details', { m0: isWebView })}>{tripDescription}</span>

          {this.renderRefreshButton(isWebView)}
        </PageHeader>

        <div className="flight-details-content">
          <SearchFlightsSummaryHeader
            date={date}
            from={from}
            to={to}
            onShareClickedCb={shareFlightStatus && isWebView ? this._onShareClicked : null}
          />
          <Container className="results">
            {flightCards.map((flightCard, id) => (
              <FlightStatusDetailCard
                key={id}
                flightCard={flightCard}
                AIRCRAFT_TYPE_FLIGHTSTATUS={AIRCRAFT_TYPE_FLIGHTSTATUS}
              />
            ))}
          </Container>
          {AIRCRAFT_TYPE_FLIGHTSTATUS && <AircraftTypeFooter />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  flightStatusDetailsPage: _.get(state, 'app.flightStatus.flightStatusDetailsPage'),
  AIRCRAFT_TYPE_FLIGHTSTATUS: _.get(state, 'app.toggles.AIRCRAFT_TYPE_FLIGHTSTATUS'),
  shareFlightStatus: _.get(state, 'app.webView.shareFlightStatus'),
  isWebView: _.get(state, 'app.webView.isWebView')
});

const mapDispatchToProps = {
  fetchFlightDetailsFn: FlightStatusSearchActions.fetchFlightDetails,
  shareFlightStatusDetailsFn: shareFlightStatusDetails
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withBodyClass('flight-details-bg'),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(FlightDetailsPage);
