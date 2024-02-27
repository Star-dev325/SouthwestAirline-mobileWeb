import { sendToDataLayer } from '@swa-ui/analytics';
import _ from 'lodash';
import {
  analyticsActionsForAirBooking,
  dataLayerSelectorsForAirBooking,
  generateUpdatedAirBookingStore
} from 'src/airBooking/analytics/index';
import {
  analyticsActionsForAirCancel,
  dataLayerSelectorsForAirCancel,
  generateUpdatedAirCancelStore
} from 'src/airCancel/analytics/index';
import {
  analyticsActionsForAirChange,
  dataLayerSelectorsForAirChange,
  generateUpdatedAirChangeStore
} from 'src/airChange/analytics/index';
import { dataLayerSelectorsForAirUpgrade } from 'src/airUpgrade/analytics';
import { analyticsActionsForCarBookingStore, generateCarBookingStore } from 'src/carBooking/analytics/index';
import { analyticsActionsForChaseBooking, generateUpdatedChaseBookingStore } from 'src/chase/analytics';
import {
  analyticsActionsForCheckInStore,
  dataLayerSelectorsForCheckIn,
  generateCheckInStore
} from 'src/checkIn/analytics/index';
import {
  analyticsActionsForCompanionBooking,
  dataLayerSelectorsForCompanionPage,
  generateUpdatedCompanionBookingStore
} from 'src/companion/analytics/index';
import {
  analyticsActionsForEarlyBird,
  dataLayerSelectorsForEarlyBird,
  generateUpdatedEarlyBirdStore
} from 'src/earlyBird/analytics/index';
import { analyticsActionsForFlightStatus, generateUpdatedFlightStatusStore } from 'src/flightStatus/analytics/index';
import { analyticsActionsForUpcomingTrips, dataLayerSelectorsForUpcomingTrips, generateUpcomingTripsStore } from 'src/myAccount/analytics/index';
import { dataLayerSelectorsForSameDay } from 'src/sameDay/analytics/index.js';
import DialogActionTypes from 'src/shared/actions/dialogActionTypes';
import { fireAnalyticsEvents } from 'src/shared/analytics/analyticsEvents';
import { analyticsActionsForEventStore, generateEventStore } from 'src/shared/analytics/eventStore/index';
import { generateUpdatedStoresForAnalytics } from 'src/shared/analytics/helpers/analyticsHelper';
import { analyticsActionsForLocaleStore, generateLocaleStore } from 'src/shared/analytics/localeStore/index';
import { analyticsActionsForMBoxStore, generateMBoxStore } from 'src/shared/analytics/mBoxStore';
import {
  analyticsActionsForSpecialAssistanceStore,
  generateSpecialAssistanceStore
} from 'src/shared/analytics/specialAssistanceStore/index';
import {
  analyticsActionsForTravelFundsStore,
  generateTravelFundsStore
} from 'src/shared/analytics/travelFundsStore/index';
import { analyticsActionsForUserStore, generateUserStore } from 'src/shared/analytics/userStore/index';
import { analyticsActionsForWebViewStore, generateWebViewStore } from 'src/shared/analytics/webViewStore/index';
import BrowserObject from 'src/shared/helpers/browserObject';
import { analyticsActionsForStandbyStore, dataLayerSelectorsForStandbyList, generateStandbyStore } from 'src/standby/analytics/index';
import { dataLayerSelectorsForTravelFunds } from 'src/travelFunds/analytics';
import { dataLayerSelectorsForUpgradedBoarding } from 'src/upgradedBoarding/analytics';
import {
  analyticsActionsForViewReservation,
  dataLayerSelectorsForViewReservation,
  generateViewReservationStore
} from 'src/viewReservation/analytics/index';

const { window } = BrowserObject;
const analyticsActions = [
  ...analyticsActionsForAirChange,
  ...analyticsActionsForAirBooking,
  ...analyticsActionsForCompanionBooking,
  ...analyticsActionsForEarlyBird,
  ...analyticsActionsForAirCancel,
  ...analyticsActionsForFlightStatus,
  ...analyticsActionsForViewReservation,
  ...analyticsActionsForEventStore,
  ...analyticsActionsForUserStore,
  ...analyticsActionsForWebViewStore,
  ...analyticsActionsForSpecialAssistanceStore,
  ...analyticsActionsForCarBookingStore,
  ...analyticsActionsForCheckInStore,
  ...analyticsActionsForTravelFundsStore,
  ...analyticsActionsForStandbyStore,
  ...analyticsActionsForChaseBooking,
  ...analyticsActionsForMBoxStore,
  ...analyticsActionsForLocaleStore,
  ...analyticsActionsForUpcomingTrips
];

const analyticsStoreGenerators = {
  AirChangeStore: generateUpdatedAirChangeStore,
  AirBookingStore: generateUpdatedAirBookingStore,
  CompanionBookingStore: generateUpdatedCompanionBookingStore,
  EarlyBirdStore: generateUpdatedEarlyBirdStore,
  AirCancelStore: generateUpdatedAirCancelStore,
  FlightStatusStore: generateUpdatedFlightStatusStore,
  AirViewReservationStore: generateViewReservationStore,
  EventStore: generateEventStore,
  UserStore: generateUserStore,
  WebViewStore: generateWebViewStore,
  SpecialAssistanceStore: generateSpecialAssistanceStore,
  CarBookingStore: generateCarBookingStore,
  CheckInStore: generateCheckInStore,
  TravelFundsStore: generateTravelFundsStore,
  StandbyListStore: generateStandbyStore,
  ChaseStore: generateUpdatedChaseBookingStore,
  mBoxStore: generateMBoxStore,
  LocaleStore: generateLocaleStore,
  UpcomingTripsStore: generateUpcomingTripsStore
};

const dataLayerSelectors = {
  ...dataLayerSelectorsForAirBooking,
  ...dataLayerSelectorsForAirCancel,
  ...dataLayerSelectorsForAirChange,
  ...dataLayerSelectorsForAirUpgrade,
  ...dataLayerSelectorsForCheckIn,
  ...dataLayerSelectorsForCompanionPage,
  ...dataLayerSelectorsForEarlyBird,
  ...dataLayerSelectorsForSameDay,
  ...dataLayerSelectorsForStandbyList,
  ...dataLayerSelectorsForTravelFunds,
  ...dataLayerSelectorsForUpcomingTrips,
  ...dataLayerSelectorsForUpgradedBoarding,
  ...dataLayerSelectorsForViewReservation
};

export default (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  if (dataLayerSelectors[action.type]) {
    const dataLayerSelector = dataLayerSelectors[action.type];
    const [mktgData, satelliteTrack, satelliteTrackData] = dataLayerSelector(state);

    sendToDataLayer(mktgData, satelliteTrack, satelliteTrackData);
  }

  if (_.includes(analyticsActions, action.type)) {
    const analyticsStores = generateUpdatedStoresForAnalytics(analyticsStoreGenerators, state, action.type);

    _.each(analyticsStores, (value, key) => {
      _.set(window, `data_a.stores.${key}`, value);
    });
  } else if (action.type === DialogActionTypes.TOGGLE_DIALOG) {
    _.set(window, 'data_a.stores.ModalStore', generateDataForModalStore(action));
  }

  fireAnalyticsEvents(store)(action);

  return result;
};

const generateDataForModalStore = (action) => {
  const { isShowDialog, options } = action;

  if (isShowDialog === true) {
    const { title, message, error = {} } = options;
    const { responseJSON = {}, $customized } = error;
    const { requestId: requestID = '', code = '', message: apiErrorMessage = '' } = responseJSON;

    const shouldRecordTitle = !requestID || $customized;

    return {
      title: shouldRecordTitle ? title : '',
      message: message || apiErrorMessage,
      code: `${code}`,
      requestID
    };
  }

  return {
    title: '',
    message: '',
    code: '',
    requestID: ''
  };
};
