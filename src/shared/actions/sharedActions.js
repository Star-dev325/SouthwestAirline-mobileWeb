// @flow
import store from 'store2';
import { store as ReduxStore } from 'src/shared/redux/createStore';
import _ from 'lodash';
import Q from 'q';
import dayjs from 'dayjs';
import SharedActionTypes, { apiActionCreator } from 'src/shared/actions/sharedActionTypes';
import { retrieveFooterContent, retrieveApplicationProperties } from 'src/wcm/actions/wcmActions';
import StorageKeys from 'src/shared/helpers/storageKeys';
import * as BoardingPassHelper from 'src/shared/helpers/boardingPassHelper';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import { generateDialogConfigFromError } from 'src/shared/transformers/dialogTransformer';
import * as AccountsApi from 'src/shared/api/accountsApi';
import { loadAirports } from 'src/airports/actions/airportsActions';
import { getMwebToggles } from 'src/shared/api/contentDeliveryApi';
import { transformToToggles } from 'src/shared/featureToggle/helpers/toggleTransformerHelper';
import { updateToggles } from 'src/shared/featureToggle/featureToggleActions';
import { setLocale } from 'src/shared/analytics/actions/analyticsActions';
import i18n from '@swa-ui/locale';
import { exitWebView } from 'src/shared/actions/webViewActions';
import { fetchBootstrapData } from 'src/app/helpers/bootstrapHelper';
import BootstrapConstants from 'src/shared/constants/bootstrapConstants';
import { push } from 'connected-react-router';

import type { PassengerNameRecord, ViewBoardingPass, ProductDefinitions } from 'src/shared/flow-typed/shared.types';
import type { Dispatch as ReduxDispatch } from 'redux';

const { RECENT_TRIP_SEARCHES_STORE_KEY_TEMPLATE } = StorageKeys;
const {
  SHARED__SET_APP_READY,
  SHARED__UPDATE_LAST_BOOKABLE_DATE,
  SHARED__UPDATE_PRODUCT_DEFINITIONS,
  SHARED__ASYNC_ACTION_START,
  SHARED__ASYNC_ACTION_FINISH,
  SHARED__ASYNC_CHAIN_CONTINUE,
  SHARED__ASYNC_CHAIN_FINISH,
  SHARED__ASYNC_CHAIN_INIT_TIMER,
  SHARED__ASYNC_CHAIN_START,
  SHARED__HIDE_SPINNER_TEMPORARILY,
  SHARED__FORCE_HIDE_SPINNER,
  SHARED__ROUTE_CHANGED,
  SHARED__HIDE_ERROR_HEADER_MSG,
  SHARED__SHOW_ERROR_HEADER_MSG,
  SHARED__TRIGGER_ERROR_POP_UP,
  SHARED__SAVE_RECENT_TRIP_SEARCH,
  SHARED__FETCH_RECENT_TRIP_SEARCHES,
  SHARED__FETCH_RECENT_TRIP_SEARCHES_SUCCESS,
  SHARED__FETCH_UPCOMING_TRIPS,
  SHARED__UPDATE_VIEW_BOARDING_PASS,
  SHARED__FETCH_FEATURE_TOGGLES,
  SHARED__SAVE_APP_STATE,
  SHARED__SET_JOURNEY_BANNER_TOGGLE,
  SHARED__UPDATE_CALENDAR_SCHEDULE_MESSAGE,
  SHARED__SET_IS_REDIRECTING_PATH
} = SharedActionTypes;

const RECENT_TRIP_SEARCH_EXPIRATION_HOURS = 48;

const { fetchFeatureToggles, fetchFeatureTogglesSuccess, fetchFeatureTogglesFailed } = apiActionCreator(
  SHARED__FETCH_FEATURE_TOGGLES,
  { isSpinnerNeeded: false }
);

const setBootstrapToggles = () => (dispatch: *) => {
  const toggles = transformToToggles(fetchBootstrapData(BootstrapConstants.APPLICATION_TOGGLES), 'enable');

  ReduxStore.dispatch(updateToggles(toggles));
  dispatch(fetchFeatureTogglesFailed());
};

export const retrieveFeatureToggles = () => (dispatch: *) => {
  dispatch(fetchFeatureToggles());

  return getMwebToggles()
    .then((response) => {
      if (response?.success) {
        const toggles = transformToToggles(response, 'results.applicationToggles.enable');

        ReduxStore.dispatch(updateToggles(toggles));
        dispatch(fetchFeatureTogglesSuccess());
      } else {
        dispatch(setBootstrapToggles());
      }
    })
    .catch(() => {
      dispatch(setBootstrapToggles());
    });
};

export const updateLastBookableDate = (lastBookableDate: string) => ({
  type: SHARED__UPDATE_LAST_BOOKABLE_DATE,
  lastBookableDate
});

export const updateCalendarScheduleMessage = (calendarScheduleMessage: string) => ({
  type: SHARED__UPDATE_CALENDAR_SCHEDULE_MESSAGE,
  calendarScheduleMessage
});

export const updateProductDefinitions = (productDefinitions: ProductDefinitions) => ({
  type: SHARED__UPDATE_PRODUCT_DEFINITIONS,
  productDefinitions
});

export const asyncActionStart = (spinnerMessage?: string) => ({
  type: SHARED__ASYNC_ACTION_START,
  spinnerMessage
});

export const asyncActionFinish = () => ({
  type: SHARED__ASYNC_ACTION_FINISH
});

export const asyncChainStart = (chainMessages?: string[], chainMessageDuration?: number) => ({
  chainMessageDuration,
  chainMessages,
  type: SHARED__ASYNC_CHAIN_START
});

export const asyncChainInitTimer = (asyncChainTimerID: number) => ({
  asyncChainTimerID,
  type: SHARED__ASYNC_CHAIN_INIT_TIMER
});

export const asyncChainContinue = (asyncChainTimerID: ?number) => ({
  asyncChainTimerID,
  type: SHARED__ASYNC_CHAIN_CONTINUE
});

export const asyncChainFinish = () => ({
  type: SHARED__ASYNC_CHAIN_FINISH
});

export const hideSpinnerTemporarily = () => ({
  type: SHARED__HIDE_SPINNER_TEMPORARILY
});

export const forceHideSpinner = (pendingCallsCount: number) => ({
  type: SHARED__FORCE_HIDE_SPINNER,
  pendingCallsCount
});

export const routeChanged = (location: HistoryLocation, method: string) => ({
  type: SHARED__ROUTE_CHANGED,
  location,
  method
});

export const hideErrorHeaderMsg = () => ({
  type: SHARED__HIDE_ERROR_HEADER_MSG
});

export const showErrorHeaderMsg = (errorMessage: string) => {
  const errorHeader = { hasError: true, errorMessage };

  return {
    type: SHARED__SHOW_ERROR_HEADER_MSG,
    errorHeader
  };
};

const setAppReady = () => ({ type: SHARED__SET_APP_READY });

export const loadInitialData = () => (dispatch: *) =>
  Q.all([
    dispatch(loadAirports()),
    dispatch(retrieveApplicationProperties()),
    dispatch(retrieveFooterContent()),
    dispatch(setLocale())
  ])
    .catch(_.noop)
    .finally(() => dispatch(setAppReady()));

export const saveRecentTripSearch = (featureName: string, passengerNameRecord: PassengerNameRecord) => {
  const { firstName, lastName, recordLocator } = passengerNameRecord;
  const recentTripSearches = store.get(_.template(RECENT_TRIP_SEARCHES_STORE_KEY_TEMPLATE)({ featureName })) || {};

  _.set(recentTripSearches, _.toUpper(`${recordLocator}_${firstName}_${lastName}`), {
    firstName: _.capitalize(firstName),
    lastName: _.capitalize(lastName),
    recordLocator: _.toUpper(recordLocator),
    timestamp: dayjs().unix()
  });

  store.set(_.template(RECENT_TRIP_SEARCHES_STORE_KEY_TEMPLATE)({ featureName }), recentTripSearches);

  return { type: SHARED__SAVE_RECENT_TRIP_SEARCH };
};

const fetchRecentTripSearchesSuccess = (featureName: string, recentTripSearches: Array<PassengerNameRecord>) => ({
  type: SHARED__FETCH_RECENT_TRIP_SEARCHES_SUCCESS,
  payload: {
    featureName,
    recentTripSearches
  }
});

const saveRecentTripSearches =
  (featureName: string) => (recentTripSearchesList: Array<PassengerNameRecord & { timestamp: string }>) => {
    const recentTripSearches = _.reduce(
      recentTripSearchesList,
      (searches, currentSearch) => {
        const { firstName, lastName, recordLocator } = currentSearch;

        return _.set(searches, _.toUpper(`${recordLocator}_${firstName}_${lastName}`), currentSearch);
      },
      {}
    );

    store.set(_.template(RECENT_TRIP_SEARCHES_STORE_KEY_TEMPLATE)({ featureName }), recentTripSearches);
  };

export const fetchRecentTripSearches =
  (featureName: string) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch({ type: SHARED__FETCH_RECENT_TRIP_SEARCHES });

      return new Promise((resolve) => {
        const recentTripSearches = store.get(_.template(RECENT_TRIP_SEARCHES_STORE_KEY_TEMPLATE)({ featureName })) || {};
        const sortedRecentTripSearches = _.chain(recentTripSearches)
          .filter((it) => dayjs.unix(it.timestamp).add(RECENT_TRIP_SEARCH_EXPIRATION_HOURS, 'hour').isAfter(dayjs()))
          .tap(saveRecentTripSearches(featureName))
          .sortBy('timestamp')
          .reverse()
          .map((recentTripSearch) => _.omit(recentTripSearch, 'timestamp'))
          .value();

        resolve(sortedRecentTripSearches);
      }).then((recentTripSearches) => {
        dispatch(fetchRecentTripSearchesSuccess(featureName, recentTripSearches));
      });
    };

const triggerErrorPopUp = (popUpError) => ({
  type: SHARED__TRIGGER_ERROR_POP_UP,
  popUpError
});

export const showErrorPopUp = (popUpError: *, shouldRedirectToHomePage: boolean = false) => (dispatch: *) => {
  const dialogConfig = generateDialogConfigFromError(popUpError);

  console.error(popUpError); // eslint-disable-line no-console
  dispatch(triggerErrorPopUp(popUpError));
  dispatch(
    showDialog({
      name: 'global-error-popup',
      active: true,
      buttons: [
        {
          label: i18n('SHARED__BUTTON_TEXT__OK'),
          onClick: () => dispatch(onClosePopUp(shouldRedirectToHomePage))
        }
      ],
      ...dialogConfig
    })
  );
};

export const onClosePopUp = (shouldRedirectToHomePage: boolean) => (dispatch: *, getState: *) => {
  const isWebView = _.get(getState(), 'app.webView.isWebView', false);

  dispatch(hideDialog()).then(() => {
    if (shouldRedirectToHomePage) {
      isWebView ? dispatch(exitWebView()) : dispatch(push('/'));
    }
  });
};

const { fetchUpcomingTrips, fetchUpcomingTripsSuccess, fetchUpcomingTripsFailed } = apiActionCreator(
  SHARED__FETCH_UPCOMING_TRIPS,
  { isSpinnerNeeded: false }
);

export const fetchUpcomingTripsNonBlocking =
  () =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(fetchUpcomingTrips());

      return AccountsApi.getUpcomingTrips()
        .then((res) => dispatch(fetchUpcomingTripsSuccess(res)))
        .catch(() => dispatch(fetchUpcomingTripsFailed()));
    };

const updateViewBoardingPassAction = (viewBoardingPass: ?ViewBoardingPass) => ({
  type: SHARED__UPDATE_VIEW_BOARDING_PASS,
  payload: viewBoardingPass
});

export const updateViewBoardingPass = (viewBoardingPass: ?ViewBoardingPass) => {
  BoardingPassHelper.setBoardingPassToSession(viewBoardingPass);

  return (dispatch: ReduxDispatch<*>) => {
    dispatch(updateViewBoardingPassAction(viewBoardingPass));
  };
};

export const saveAppState = (state: { app: * }) => ({
  type: SHARED__SAVE_APP_STATE,
  state
});

export const setJourneyBannerToggle = (isEnabled: boolean) => ({
  type: SHARED__SET_JOURNEY_BANNER_TOGGLE,
  payload: isEnabled
});

export const setIsRedirectingPath = (isRedirectingPath: boolean) => ({
  type: SHARED__SET_IS_REDIRECTING_PATH,
  isRedirectingPath
});
