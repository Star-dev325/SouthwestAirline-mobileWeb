// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import type { Dispatch as ReduxDispatch } from 'redux';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import AirportsActionTypes, { apiActionCreator } from 'src/airports/actions/airportsActionTypes';
import { getAirportFromCode } from 'src/airports/helpers/airportsHelpers';
import RecentAirportSearchLocalStorageHelper from 'src/airports/helpers/recentAirportSearchLocalStorageHelper';
import { saveRecentFlightAirport } from 'src/shared/actions/accountActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import * as SharedActions from 'src/shared/actions/sharedActions';
import * as FlightBookingApi from 'src/shared/api/flightBookingApi';
import * as WcmApi from 'src/shared/api/wcm/wcmApi';
import * as LocalStorageCache from 'src/shared/cache/localStorageCache';
import type { AirportGroupData, Dispatch as ThunkDispatch, MultiSelectGroup } from 'src/shared/flow-typed/shared.types';
import { transformToAirport } from 'src/shared/transformers/airStationTransformer';

const { fetchAirportInfo, fetchAirportInfoSuccess, fetchAirportInfoFailed } = apiActionCreator(
  AirportsActionTypes.AIRPORTS__FETCH_AIRPORT_INFO
);

export const getAirportInfo = (airportCode: string) => (dispatch: *) => {
  dispatch(fetchAirportInfo());

  return WcmApi.getJsonFile(`content/generated/data/airport_info/${airportCode.toLowerCase()}_airport_info.json`)
    .then((response) => {
      dispatch(fetchAirportInfoSuccess());
      dispatch(updateAirportInfo(response.airport_info));
    })
    .catch(() => {
      dispatch(fetchAirportInfoFailed());
      dispatch(
        showDialog({
          name: 'wcm-load-error',
          title: i18n('SHARED__ERROR_MESSAGES__WCM_LOAD_ERROR_TITLE'),
          message: i18n('SHARED__ERROR_MESSAGES__WCM_LOAD_ERROR_MESSAGE'),
          buttons: [
            {
              label: 'Close',
              onClick: () => {
                dispatch(hideDialog());
                window.close();
              }
            }
          ]
        })
      );
    });
};

type Options = {
  airports: *,
  lastBookableDate: *,
  productDefinitions: *,
  corporateBookingSwitch: *,
  calendarScheduleMessage: ''
};
const { fetchAllAirports, fetchAllAirportsSuccess, fetchAllAirportsFailed } = apiActionCreator(
  AirportsActionTypes.AIRPORTS__FETCH_ALL_AIRPORTS
);

export const loadAirports = () => (dispatch: ThunkDispatch) => {
  dispatch(fetchAllAirports());
  const options = {
    airports: LocalStorageCache.loadAirports(),
    lastBookableDate: LocalStorageCache.loadLastBookableDate(),
    productDefinitions: LocalStorageCache.loadProductDefinitions(),
    corporateBookingSwitch: LocalStorageCache.loadCorporateBookingSwitchInfo(),
    calendarScheduleMessage: LocalStorageCache.loadCalendarScheduleMessage()
  };

  if (shouldRefreshData(options)) {
    LocalStorageCache.saveAirports([]);
    dispatch(resetAirports());

    return FlightBookingApi.fetchShoppingDetails()
      .then((response) => dispatch(handleShoppingDetailsResponse(response)))
      .catch((error) => dispatch(fetchAllAirportsFailed(error)));
  } else {
    dispatch(storeAirportData(options));
  }
};

export const loadRecentlySearched = () => {
  const recentSearches = RecentAirportSearchLocalStorageHelper.recentAirportSearches.map(
    (recentSearch) => recentSearch.value
  );

  return (dispatch: ReduxDispatch<*>) => {
    dispatch(saveRecentAirportSearchList(recentSearches));
  };
};

export const updateRecentAirportSearch = (airport: *) => {
  const recentSearches = RecentAirportSearchLocalStorageHelper.save(airport);

  return (dispatch: ReduxDispatch<*>) => {
    dispatch(saveRecentAirportSearchList(recentSearches.map((recentSearch) => recentSearch.value)));
  };
};

export const deleteFromRecentAirportSearch = (airport: *) => {
  const recentSearches = RecentAirportSearchLocalStorageHelper.delete(airport);

  return (dispatch: ReduxDispatch<*>) => {
    dispatch(saveRecentAirportSearchList(recentSearches.map((recentSearch) => recentSearch.value)));
  };
};

const handleShoppingDetailsResponse = (response: *) => (dispatch: ThunkDispatch) => {
  const { airStations, lastBookableDate, productDefinitions, corporateBookingSwitch, calendarScheduleMessage } =
    response;
  const airports = _.map(airStations, transformToAirport);
  const options = { lastBookableDate, productDefinitions, corporateBookingSwitch, airports, calendarScheduleMessage };

  storeShoppingDetailsResponse(response);
  dispatch(storeAirportData(options));
};

const saveRecentAirportSearchList = (recentSearches: *) => ({
  type: AirportsActionTypes.AIRPORTS__UPDATE_RECENT_AIRPORT_SEARCH,
  recentSearches
});

const shouldRefreshData = ({
  airports,
  lastBookableDate,
  productDefinitions,
  corporateBookingSwitch,
  calendarScheduleMessage
}: Options) =>
  _.isEmpty(airports) ||
  _.isEmpty(lastBookableDate) ||
  _.isEmpty(productDefinitions) ||
  _.isEmpty(corporateBookingSwitch) ||
  _.isEmpty(calendarScheduleMessage);

const storeAirportData = (options: Options) => (dispatch: ReduxDispatch<*>) => {
  dispatch(SharedActions.updateLastBookableDate(options.lastBookableDate));
  dispatch(SharedActions.updateCalendarScheduleMessage(options.calendarScheduleMessage));
  dispatch(SharedActions.updateProductDefinitions(options.productDefinitions));
  !_.isEmpty(options.corporateBookingSwitch) &&
    dispatch(AirBookingActions.updateCorporateBookingSwitchInfo(options.corporateBookingSwitch));
  dispatch(fetchAllAirportsSuccess(options.airports));
};

const storeShoppingDetailsResponse = (response: *) => {
  const { airStations, lastBookableDate, productDefinitions, corporateBookingSwitch, calendarScheduleMessage } =
    response;
  const airports = _.map(airStations, transformToAirport);

  LocalStorageCache.saveLastBookableDate(lastBookableDate);
  LocalStorageCache.saveProductDefinitions(productDefinitions);
  LocalStorageCache.saveAirports(airports);
  !_.isEmpty(corporateBookingSwitch) && LocalStorageCache.saveCorporateBookingSwitchInfo(corporateBookingSwitch);
  LocalStorageCache.saveCalendarScheduleMessage(calendarScheduleMessage);
};

export const updateAirportInfo = (airportInfo: *) => ({
  type: AirportsActionTypes.AIRPORTS__UPDATE_AIRPORT_INFO,
  airportInfo
});

export const resetRecentAirportSearch = () => ({
  type: AirportsActionTypes.AIRPORTS__RESET_RECENT_AIRPORT_SEARCH
});

export const resetAirports = () => ({
  type: AirportsActionTypes.AIRPORTS__RESET_AIRPORTS
});

export const saveDestinationAirport = (airportCode: string) => (dispatch: ThunkDispatch, getState: () => *) => {
  const allAirports = _.get(getState(), 'app.airports.allAirports', []);
  const { airportName } = getAirportFromCode(allAirports, airportCode);

  dispatch(saveRecentFlightAirport(airportName));
};

export const updateMultiSelectGroup = (airportGroupData: AirportGroupData, formId: string) => ({
  type: AirportsActionTypes.AIRPORTS__UPDATE_MULTI_SELECT_GROUP,
  response: airportGroupData,
  formId
});

export const saveMultiSelectGroup = (multiSelectGroup: MultiSelectGroup) => ({
  type: AirportsActionTypes.AIRPORTS__SAVE_MULTI_SELECT_GROUP,
  response: multiSelectGroup
});

export const clearMultiSelectGroupFormId = (formId: string) => ({
  type: AirportsActionTypes.AIRPORTS__CLEAR_MULTI_SELECT_GROUP_FORM_ID,
  formId
});

export const loadMultiSelectGroup = (multiSelectGroup: MultiSelectGroup) => ({
  type: AirportsActionTypes.AIRPORTS__LOAD_MULTI_SELECT_GROUP,
  response: multiSelectGroup
});

export const clearMultiSelectGroup = () => ({
  type: AirportsActionTypes.AIRPORTS__CLEAR_MULTI_SELECT_GROUP
});

export const updatetMultiSelectGroupCurrentDirection = (direction: 'string') => ({
  type: AirportsActionTypes.AIRPORTS__UPDATE_MULTI_SELECT_GROUP_CURRENT_DIRECTION,
  response: direction
});

export const updateUnavailableMultiSelectGroup = (unavailableGroup: { origin: string, destination: string }) => ({
  type: AirportsActionTypes.AIRPORTS__UPDATE_UNAVAILABLE_MULTI_SELECT_GROUP,
  response: unavailableGroup
});

export const clearUnavailableMultiSelectGroup = () => ({
  type: AirportsActionTypes.AIRPORTS__CLEAR_UNAVAILABLE_MULTI_SELECT_GROUP
});
