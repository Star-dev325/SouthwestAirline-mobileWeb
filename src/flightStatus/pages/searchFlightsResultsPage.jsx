// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as FlightStatusSearchActions from 'src/flightStatus/actions/flightStatusSearchActions';
import FlightCard from 'src/flightStatus/components/flightCard';
import type { FlightSchedulesPageType, RecentSearchRequestType } from 'src/flightStatus/flow-typed/flightStatus.types';
import Container from 'src/shared/components/container';
import PageHeader from 'src/shared/components/pageHeader';
import SearchFlightsSummaryHeader from 'src/shared/components/searchFlightsSummaryHeader';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import type { Push } from 'src/shared/flow-typed/shared.types';
import { isOnOldRoute } from 'src/shared/helpers/urlHelper';

type Props = {
  flightSchedulesPage: {
    response: FlightSchedulesPageType
  },
  isWebView?: boolean,
  fetchFlightStatusFn: (searchRequest: RecentSearchRequestType, shouldGoToNextPage: boolean, push: Push) => *,
  push: Push,
  params: {
    from: string,
    to: string,
    date: string
  },
  query?: {
    departureDate: string,
    destinationAirportCode: string,
    originationAirportCode: string
  },
  lookUpFlightStatusDetailsFn: (Link, Push) => *
};

export class SearchFlightsResultsPage extends React.Component<Props> {
  componentDidMount() {
    const { fetchFlightStatusFn, flightSchedulesPage, params, push, query } = this.props;
    
    if (_.isEmpty(flightSchedulesPage.response)) {
      let { date, from, to  } = params;

      if (!isOnOldRoute() && query)  {
        const { departureDate, destinationAirportCode, originationAirportCode } = query;
        
        date = departureDate;
        from = originationAirportCode;
        to = destinationAirportCode;
      }

      fetchFlightStatusFn({ date, from, to }, false, push);
    }
  }

  _onFlightCardClicked = (flightStatusDetail: Link) => {
    const { lookUpFlightStatusDetailsFn, push } = this.props;

    lookUpFlightStatusDetailsFn(flightStatusDetail, push);
  };

  renderBody() {
    const {
      flightSchedulesPage: { response }
    } = this.props;
    const from = _.get(response, 'header.from', '');
    const to = _.get(response, 'header.to', '');
    const date = _.get(response, 'header.date', '');
    const flights = _.get(response, 'flights', []);

    return (
      <div ref="loadedBody" className="page container" data-qa="search flight results page">
        <SearchFlightsSummaryHeader from={from} to={to} date={date} />
        <Container>
          {flights.map((flight, id) => (
            <FlightCard key={id} flight={flight} onFlightCardClicked={this._onFlightCardClicked} />
          ))}
        </Container>
      </div>
    );
  }

  render() {
    if (_.isEmpty(this.props.flightSchedulesPage.response)) {
      return null;
    }

    const {
      flightSchedulesPage: { response },
      isWebView
    } = this.props;
    const tripDescription = _.get(response, 'header.tripDescription', '');

    return (
      <div>
        <PageHeader>
          <span className="page-title">
            {isWebView ? '' : 'Flight Status'} <span className="normal italics">{tripDescription}</span>
          </span>
        </PageHeader>

        {this.renderBody()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  flightSchedulesPage: _.get(state, 'app.flightStatus.flightSchedulesPage'),
  isWebView: state.app.webView.isWebView
});

const mapDispatchToProps = {
  lookUpFlightStatusDetailsFn: FlightStatusSearchActions.lookUpFlightStatusDetails,
  fetchFlightStatusFn: FlightStatusSearchActions.fetchFlightStatus
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withBodyClass('flight-status-search-result'),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(SearchFlightsResultsPage);
