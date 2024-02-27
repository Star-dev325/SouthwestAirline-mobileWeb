// @flow

import i18n from '@swa-ui/locale';
import cx from 'classnames';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as AirportInfoActions from 'src/airports/actions/airportInfoActions';
import * as AirportsActions from 'src/airports/actions/airportsActions';
import * as FlightStatusSearchActions from 'src/flightStatus/actions/flightStatusSearchActions';
import FlightStatusSearchForm from 'src/flightStatus/components/flightStatusSearchForm';
import { transformToFlightSearchRequest } from 'src/flightStatus/transformers/flightStatusTransformer';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import Container from 'src/shared/components/container';
import PageHeader from 'src/shared/components/pageHeader';
import { FLIGHT_STATUS_SEARCH_FORM } from 'src/shared/constants/formIds';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withFeatureToggles from 'src/shared/enhancers/withFeatureToggles';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type { RecentSearchRequestType, SearchFormData } from 'src/flightStatus/flow-typed/flightStatus.types';
import type { AirportType, Push } from 'src/shared/flow-typed/shared.types';

type Props = {
  allAirports: Array<AirportType>,
  analyticsTrackSubmitFormFn: (*) => void,
  fetchFlightDetailsFn: (RecentSearchRequestType, boolean, Push, boolean) => *,
  fetchFlightStatusFn: (RecentSearchRequestType, boolean, Push) => *,
  getRecentSearchesFromLocalStorageFn: () => void,
  isWebView: boolean,
  loadAirportsFn: () => void,
  loadRecentlySearchedFn: () => void,
  push: Push,
  query?: {
    departureDate?: string,
    destinationAirportCode?: string,
    originationAirportCode?: string,
    flightNumber?: string
  },
  recentlySearched: Array<AirportType>,
  selectedRecentSearchRequest: ?RecentSearchRequestType,
  updateFormDataValueFn: (string, *) => void,
  updateSelectedAirportInfoFn: (airportInfo: *) => void
};

export class FlightStatusLandingPage extends React.Component<Props> {
  componentDidMount() {
    const { getRecentSearchesFromLocalStorageFn, loadAirportsFn, loadRecentlySearchedFn, query, updateFormDataValueFn } = this.props;

    if (query)  {
      const { departureDate, destinationAirportCode, flightNumber, originationAirportCode } = query;

      updateFormDataValueFn(FLIGHT_STATUS_SEARCH_FORM, {
        destinationAirport: destinationAirportCode,
        flightNumber,
        originAirport: originationAirportCode,
        selectedDate: departureDate
      });
    }

    loadAirportsFn();
    loadRecentlySearchedFn();
    getRecentSearchesFromLocalStorageFn();
  }

  _onSubmit = (formData: SearchFormData) => {
    const { analyticsTrackSubmitFormFn, updateFormDataValueFn } = this.props;
    const searchRequest = transformToFlightSearchRequest(
      formData.originAirport,
      formData.destinationAirport,
      formData.selectedDate,
      formData.flightNumber
    );

    updateFormDataValueFn(FLIGHT_STATUS_SEARCH_FORM, {
      originAirport: formData.originAirport,
      destinationAirport: formData.destinationAirport,
      selectedDate: formData.selectedDate,
      flightNumber: formData.flightNumber
    });
    analyticsTrackSubmitFormFn('flight-status-search');
    this._transitionToNextPage(searchRequest);
  };

  _transitionToNextPage(searchRequest: RecentSearchRequestType) {
    const { fetchFlightStatusFn, fetchFlightDetailsFn, push } = this.props;

    if (_.isEmpty(searchRequest.flightNumber)) {
      fetchFlightStatusFn(searchRequest, true, push);
    } else {
      fetchFlightDetailsFn(searchRequest, true, push, true);
    }
  }

  render() {
    let newFormData = {};
    const { selectedRecentSearchRequest, allAirports, recentlySearched, updateSelectedAirportInfoFn, isWebView } =
      this.props;

    if (selectedRecentSearchRequest) {
      newFormData = {
        originAirport: _.get(selectedRecentSearchRequest, 'from'),
        destinationAirport: _.get(selectedRecentSearchRequest, 'to'),
        selectedDate: _.get(selectedRecentSearchRequest, 'date')
      };

      if (!_.isEmpty(selectedRecentSearchRequest.flightNumber)) {
        _.set(newFormData, 'flightNumber', selectedRecentSearchRequest.flightNumber);
      }
    }

    return (
      <div>
        <PageHeader className={cx({ 'center caps bgsdkblue px0': isWebView })} noBottomPadding>
          {isWebView ? 'SEARCH' : i18n('SHARED__FLIGHT_STATUS__TITLE')}
          <Link
            data-qa="recent-search-button"
            className={cx(
              'right white page-header--right-button',
              { regular: !isWebView },
              { 'bold center halfwidth bgsblue': isWebView }
            )}
            to={getNormalizedRoute({ routeName: 'recent' })}
          >
            {i18n('SHARED__FLIGHT_STATUS__RECENT')}
          </Link>
        </PageHeader>
        <Container>
          <FlightStatusSearchForm
            formId={FLIGHT_STATUS_SEARCH_FORM}
            onSubmit={this._onSubmit}
            initialFormData={newFormData}
            updateSelectedAirportInfoFn={updateSelectedAirportInfoFn}
            allAirports={allAirports}
            recentlySearched={recentlySearched}
            isWebView={isWebView}
          />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedRecentSearchRequest: _.get(state, 'app.flightStatus.selectedRecentSearchRequest'),
  allAirports: _.get(state, 'app.airports.allAirports'),
  recentlySearched: _.get(state, 'app.airports.recentlySearched'),
  isWebView: state.app.webView.isWebView
});

const mapDispatchToProps = {
  fetchFlightStatusFn: FlightStatusSearchActions.fetchFlightStatus,
  fetchFlightDetailsFn: FlightStatusSearchActions.fetchFlightDetails,
  getRecentSearchesFromLocalStorageFn: FlightStatusSearchActions.getRecentSearchesFromLocalStorage,
  analyticsTrackSubmitFormFn: AnalyticsActions.trackSubmitForm,
  updateFormDataValueFn: FormDataActions.updateFormDataValue,
  loadAirportsFn: AirportsActions.loadAirports,
  loadRecentlySearchedFn: AirportsActions.loadRecentlySearched,
  updateSelectedAirportInfoFn: AirportInfoActions.updateSelectedAirportInfo
};

const enhancers = _.flowRight(
  withBodyClass('flight-status-search'),
  withConnectedReactRouter,
  withFeatureToggles,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(FlightStatusLandingPage);
