// @flow
import _ from 'lodash';
import dayjs from 'dayjs';
import { combineReducers } from 'redux';

import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import airBookingReducers from 'src/airBooking/reducers';
import airCancelReducers from 'src/airCancel/reducers';
import companionReducers from 'src/companion/reducers';
import errorHeaderReducer from 'src/shared/reducers/errorHeaderReducer';
import globalHeaderReducer from 'src/shared/reducers/globalHeaderReducer';
import webViewReducer from 'src/shared/reducers/webViewReducer';
import applePayReducer from 'src/shared/reducers/applePayReducer';
import upliftReducer from 'src/shared/reducers/upliftReducer';
import formDataReducer from 'src/shared/reducers/formDataReducer';
import accountReducer from 'src/shared/reducers/accountReducer';
import savedCreditCardsReducer from 'src/shared/reducers/savedCreditCardsReducer';
import { spinner } from 'src/shared/reducers/spinnerReducer';
import { upcomingTrips } from 'src/shared/reducers/upcomingTripsReducer';
import airportInfoReducer from 'src/airports/reducers/airportInfoReducer';
import airportsReducer from 'src/airports/reducers/airportsReducer';
import { togglesReducer } from 'src/shared/featureToggle/featureToggleReducers';
import airChangeReducers from 'src/airChange/reducers';
import { dialog } from 'src/shared/reducers/dialogReducer';
import reLoginModalReducers from 'src/login/reducers/reLoginModalReducer';
import earlyBirdReducers from 'src/earlyBird/reducers';
import contractTracingReducers from 'src/contactTracing/reducers';
import checkInReducers from 'src/checkIn/reducers';
import viewReservationReducers from 'src/viewReservation/reducers';
import wcmReducers from 'src/wcm/reducers/wcmReducers';
import flightStatusReducers from 'src/flightStatus/reducers';
import flowStatusReducer from 'src/shared/reducers/flowStatusReducer';
import PayPalActionTypes from 'src/shared/actions/payPalActionTypes';
import { viewBoardingPass } from 'src/shared/reducers/viewBoardingPassReducer';
import carBookingReducers from 'src/carBooking/reducers';
import messageTravelAdvisory from 'src/travelAdvisory/reducers/travelAdvisoryReducer';
import travelFundsReducers from 'src/travelFunds/reducers';
import myAccountReducers from 'src/myAccount/reducers';
import standbyReducers from 'src/standby/reducers';
import homeAndNavReducers from 'src/homeAndNav/reducers';
import enrollReducer from 'src/enroll/reducers';
import upgradedBoardingReducers from 'src/upgradedBoarding/reducers';
import externalPaymentReducer from 'src/externalPayment/reducers/externalPaymentReducer';
import chaseReducers from 'src/chase/reducers/chaseReducers';
import airUpgradeReducers from 'src/airUpgrade/reducers';
import { isRedirectingPath } from 'src/shared/reducers/isRedirectingPathReducer';
import { calendarScheduleMessage } from 'src/shared/reducers/calendarScheduleMessageReducer';
import sameDayReducers from 'src/sameDay/reducers';

const lastBookableDate = (state: string = dayjs().add(6, 'months').format('YYYY-MM-DD'), action = {}) => {
  switch (action.type) {
    case SharedActionTypes.SHARED__UPDATE_LAST_BOOKABLE_DATE: {
      return _.cloneDeep(action.lastBookableDate);
    }
  }

  return state;
};

const productDefinitions = (state = {}, action = {}) => {
  switch (action.type) {
    case SharedActionTypes.SHARED__UPDATE_PRODUCT_DEFINITIONS: {
      return _.cloneDeep(action.productDefinitions);
    }
  }

  return state;
};

const appReady = (state = false, action = {}) => {
  if (action.type === SharedActionTypes.SHARED__SET_APP_READY) {
    return true;
  }

  return state;
};

const isJourneyBannerDisplayed = (state = false, action = {}) => {
  if (action.type === SharedActionTypes.SHARED__SET_JOURNEY_BANNER_TOGGLE) {
    return action.payload;
  }

  return state;
};

const app = combineReducers({
  account: accountReducer,
  airBooking: airBookingReducers,
  airCancel: airCancelReducers,
  airChange: airChangeReducers,
  airportInfo: airportInfoReducer,
  airports: airportsReducer,
  appReady,
  applePay: applePayReducer,
  calendarScheduleMessage,
  carBooking: carBookingReducers,
  chase: chaseReducers,
  checkIn: checkInReducers,
  companion: companionReducers,
  dialog,
  isRedirectingPath,
  reLoginModal: reLoginModalReducers,
  contactTracing: contractTracingReducers,
  earlyBird: earlyBirdReducers,
  enroll: enrollReducer,
  errorHeader: errorHeaderReducer,
  externalPayment: externalPaymentReducer,
  flightStatus: flightStatusReducers,
  flowStatus: flowStatusReducer,
  formData: formDataReducer,
  globalHeader: globalHeaderReducer,
  homeAndNav: homeAndNavReducers,
  isJourneyBannerDisplayed,
  lastBookableDate,
  productDefinitions,
  myAccountPages: myAccountReducers,
  savedCreditCards: savedCreditCardsReducer,
  spinner,
  standby: standbyReducers,
  toggles: togglesReducer,
  travelAdvisory: messageTravelAdvisory,
  travelFunds: travelFundsReducers,
  upcomingTrips,
  upgradedBoarding: upgradedBoardingReducers,
  uplift: upliftReducer,
  airUpgrade: airUpgradeReducers,
  viewBoardingPass,
  viewReservation: viewReservationReducers,
  wcmContent: wcmReducers,
  webView: webViewReducer,
  sameDay: sameDayReducers
});

const appReducers = (state: *, action: *) => {
  switch (action.type) {
    case PayPalActionTypes.PAYPAL__RESUME_APP_STATE: {
      const toUpdateState = _.assign({}, state, _.get(action, 'payload.state.app'));

      return app(toUpdateState, action);
    }
    case SharedActionTypes.SHARED__SAVE_APP_STATE: {
      const toUpdateState = _.merge({}, state, _.get(action, 'state.app'));

      return app(toUpdateState, action);
    }
  }

  return app(state, action);
};

export default appReducers;
