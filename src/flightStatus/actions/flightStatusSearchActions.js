// @flow

import _ from 'lodash';
import * as FlightStatusChapiApi from 'src/shared/api/flightStatusApi';
import flightStatusActionTypes, { apiActionCreator } from 'src/flightStatus/actions/flightStatusActionTypes';
import FlightSearchHistoryLocalStorageHelper from 'src/flightStatus/helper/flightSearchHistoryLocalStorageHelper';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';

import type { Dispatch as ReduxDispatch } from 'redux';
import type {
  FlightDetailsQueryType,
  FlightDetailsWithFlightKeysQueryType,
  RecentSearchRequestType,
  FlightSearchType
} from 'src/flightStatus/flow-typed/flightStatus.types';
import type { Push } from 'src/shared/flow-typed/shared.types';
import { getNormalizedRoute, isOnOldRoute } from 'src/shared/helpers/urlHelper';

const {
  FLIGHT_STATUS__RESET_FLOW_DATA,
  FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS,
  FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS,
  FLIGHT_STATUS__LOOKUP_FLIGHT_DETAILS,
  FLIGHT_STATUS__SAVE_SELECTED_RECENT_SEARCH_REQUEST,
  FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS
} = flightStatusActionTypes;

const { fetchSearchFlightStatus, fetchSearchFlightStatusSuccess, fetchSearchFlightStatusFailed } = apiActionCreator(
  FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS
);

const { fetchSearchFlightDetails, fetchSearchFlightDetailsSuccess, fetchSearchFlightDetailsFailed } = apiActionCreator(
  FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS
);

const { lookupFlightDetails, lookupFlightDetailsSuccess, lookupFlightDetailsFailed } = apiActionCreator(
  FLIGHT_STATUS__LOOKUP_FLIGHT_DETAILS
);

export const resetFlightStatusFlowData = () => ({
  type: FLIGHT_STATUS__RESET_FLOW_DATA
});

export const saveSelectedRecentSearchRequest = (selectedRecentSearchRequest: RecentSearchRequestType) => ({
  type: FLIGHT_STATUS__SAVE_SELECTED_RECENT_SEARCH_REQUEST,
  selectedRecentSearchRequest
});

export const getRecentSearchesFromLocalStorage = () => (dispatch: ReduxDispatch<*>) => {
  dispatch(saveRecentSearchRequests(FlightSearchHistoryLocalStorageHelper.get()));
};

const saveRecentSearchRequests = (searchRequests: Array<RecentSearchRequestType>) => ({
  type: FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS,
  searches: searchRequests
});

export const deleteRecentSearchRequest = (searchRequest: RecentSearchRequestType) => (dispatch: ReduxDispatch<*>) => {
  FlightSearchHistoryLocalStorageHelper.delete(searchRequest);
  dispatch(saveRecentSearchRequests(FlightSearchHistoryLocalStorageHelper.get()));
};

export const fetchFlightStatus =
  (searchRequest: RecentSearchRequestType, shouldGoToNextPage: boolean, push: Push) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(resetFlightStatusFlowData());
      dispatch(fetchSearchFlightStatus());

      return FlightStatusChapiApi.searchForFlights(searchRequest)
        .then((response) => {
          dispatch(fetchSearchFlightStatusSuccess(response));

          if (shouldGoToNextPage) {
            FlightSearchHistoryLocalStorageHelper.save(searchRequest);
            dispatch(saveRecentSearchRequests(FlightSearchHistoryLocalStorageHelper.get()));

            const modifiedSearchRequest = isOnOldRoute()
              ? searchRequest
              : {
                departureDate: searchRequest.date,
                destinationAirportCode: searchRequest.to,
                originationAirportCode: searchRequest.from
              };
            const pushParams = isOnOldRoute()
              ? buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'results' }), modifiedSearchRequest)
              : buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'results' }), null, modifiedSearchRequest);

            push(pushParams);
          }
        })
        .catch((error) => dispatch(fetchSearchFlightStatusFailed(error)));
    };

export const fetchFlightDetails =
  (searchRequest: FlightSearchType, shouldGoToNextPage: boolean, push: Push, shouldResetFlowData: boolean, withFlightKeys: boolean) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      shouldResetFlowData && dispatch(resetFlightStatusFlowData());
      dispatch(fetchSearchFlightDetails());

      return FlightStatusChapiApi.lookUpFlightDetails(withFlightKeys? { query: {
        'flight-keys': searchRequest?.flightKeys
      } }: { query: _transformToQuery(searchRequest) })
        .then((response) => {
          dispatch(fetchSearchFlightDetailsSuccess(response));

          if (shouldGoToNextPage) {
            FlightSearchHistoryLocalStorageHelper.save(searchRequest);
            dispatch(saveRecentSearchRequests(FlightSearchHistoryLocalStorageHelper.get()));

            const pushParams = buildPathWithParamAndQuery(
              getNormalizedRoute({ routeName: 'details' }),
              null,
              _.pickBy(searchRequest, _.negate(_.isEmpty))
            );

            push(pushParams);
          }
        })
        .catch((error) => dispatch(fetchSearchFlightDetailsFailed(error)));
    };

export const lookUpFlightStatusDetails =
  (flightDetailsRequest: Link, push: Push) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(lookupFlightDetails());

      return FlightStatusChapiApi.lookUpFlightDetails(flightDetailsRequest)
        .then((response) => {
          dispatch(lookupFlightDetailsSuccess(response));

          if (flightDetailsRequest.query) {
            const flightSearchRequest = _createFlightSearchRequestFromQuery(flightDetailsRequest.query);
            const pushParams = buildPathWithParamAndQuery(
              getNormalizedRoute({ routeName: 'details' }),
              null,
              flightSearchRequest
            );

            push(pushParams);
          }
        })
        .catch((error) => dispatch(lookupFlightDetailsFailed(error)));
    };

const _transformToQuery = (searchRequest: FlightSearchType): FlightDetailsQueryType => {
  const toAirport = _.get(searchRequest, 'to');
  const connectingAirportCode = _.get(searchRequest, 'connectingAirportCode');
    
  const queryParameters: FlightDetailsQueryType = {
    'origin-airport1': _.get(searchRequest, 'from'),
    'destination-airport1': connectingAirportCode || toAirport,
    'departure-date': _.get(searchRequest, 'date'),
    'flight-keys': _.get(searchRequest, 'flightKeys'),
    'flight-number1': _.get(searchRequest, 'flightNumber')
  };
    
  if (!_.isEmpty(connectingAirportCode) && !_.isEmpty(toAirport) && !_.isEmpty(searchRequest.secondFlightNumber)) {
    queryParameters['origin-airport2'] = connectingAirportCode;
    queryParameters['destination-airport2'] = toAirport;
    queryParameters['flight-number2'] = _.get(searchRequest, 'secondFlightNumber');
  }
    
  return queryParameters;
};

const _createFlightSearchRequestFromQuery = (query: FlightDetailsWithFlightKeysQueryType) => ({
  flightKeys: query['flight-keys']
});
