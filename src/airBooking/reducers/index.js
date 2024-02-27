import _ from 'lodash';
import { combineReducers } from 'redux';

import * as AirBookingReducers from 'src/airBooking/reducers/airBookingReducers';
import FlightShoppingPageReducers from 'src/airBooking/reducers/flightShoppingPageReducers';
import RecentSearchesPageReducers from 'src/airBooking/reducers/recentSearchesPageReducers';
import FlightPricingPageReducers from 'src/airBooking/reducers/flightPricingPageReducers';
import PurchaseSummaryPageReducers from 'src/airBooking/reducers/purchaseSummaryPageReducers';
import flightConfirmationPageReducers from 'src/airBooking/reducers/flightConfirmationPageReducers';
import { applyTravelFunds } from 'src/shared/reducers/applyTravelFundsReducers';
import LowFareCalendarReducers from 'src/airBooking/reducers/lowFareCalendarReducers';
import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';

const airBookingReducer = combineReducers({
  recentSearchesPage: RecentSearchesPageReducers,
  flightShoppingPage: FlightShoppingPageReducers,
  flightPricingPage: FlightPricingPageReducers,
  purchaseSummaryPage: PurchaseSummaryPageReducers,
  flightConfirmationPage: flightConfirmationPageReducers,
  applyTravelFundsPage: applyTravelFunds,
  lowFareCalendar: LowFareCalendarReducers,
  ...AirBookingReducers
});

const resetExceptions = [
  'savePassengerCount',
  'searchRequest',
  'recentSearchesPage',
  'corporateBookingSwitchInfo',
  'selectedFrequentTravelers'
];
const resetAllStateExcept = (state) =>
  _.mapValues(state, (value, key) => (_.includes(resetExceptions, key) ? value : undefined));

const airBooking = (state, action) => {
  if (action.type === AirBookingActionTypes.AIR_BOOKING__RESET_AIR_BOOKING_FLOW_DATA) {
    return airBookingReducer(resetAllStateExcept(state), action);
  }

  return airBookingReducer(state, action);
};

export default airBooking;
