import _ from 'lodash';
import { combineReducers } from 'redux';

import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';

const response = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_LOW_FARE_CALENDAR: {
      return null;
    }
    case AirBookingActionTypes.AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    case AirBookingActionTypes.AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_OUTBOUND_ANALYTICS: {
      const lowFareCalendarAnalyticsOutbound = {};

      lowFareCalendarAnalyticsOutbound.lowestpriceout = _.get(action, 'lowFareCalendarAnalytics.lowestpriceout');
      lowFareCalendarAnalyticsOutbound.lowestpointsout = _.get(action, 'lowFareCalendarAnalytics.lowestpointsout');
      lowFareCalendarAnalyticsOutbound.datesout = _.get(action, 'lowFareCalendarAnalytics.datesout');

      return _.merge({}, state, {
        lowFareCalendarPage: { lowFareCalendarAnalytics: { ...lowFareCalendarAnalyticsOutbound } }
      });
    }
    case AirBookingActionTypes.AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_INBOUND_ANALYTICS: {
      const lowFareCalendarAnalyticsInbound = {};

      lowFareCalendarAnalyticsInbound.lowestpricereturn = _.get(action, 'lowFareCalendarAnalytics.lowestpriceout');
      lowFareCalendarAnalyticsInbound.lowestpointsreturn = _.get(action, 'lowFareCalendarAnalytics.lowestpointsout');
      lowFareCalendarAnalyticsInbound.datesrtn = _.get(action, 'lowFareCalendarAnalytics.datesout');

      return _.merge({}, state, {
        lowFareCalendarPage: { lowFareCalendarAnalytics: { ...lowFareCalendarAnalyticsInbound } }
      });
    }
    default:
      return state;
  }
};

const outboundPage = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_SUCCESS: {
      const lowFareCalendarOutboundPage = _.get(action, 'response.lowFareCalendarPage.outboundPage');

      return lowFareCalendarOutboundPage ? _.cloneDeep(lowFareCalendarOutboundPage) : null;
    }
    case AirBookingActionTypes.AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE_SUCCESS:
    case AirBookingActionTypes.AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    default:
      return state;
  }
};

const inboundPage = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_SUCCESS: {
      const lowFareCalendarInboundPage = _.get(action, 'response.lowFareCalendarPage.inboundPage');

      return lowFareCalendarInboundPage ? _.cloneDeep(lowFareCalendarInboundPage) : null;
    }
    case AirBookingActionTypes.AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE_SUCCESS:
    case AirBookingActionTypes.AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    default:
      return state;
  }
};

const selectedDates = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_OUTBOUND_DATE: {
      return { ...state, outboundDate: action.date };
    }
    case AirBookingActionTypes.AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_INBOUND_DATE: {
      return { ...state, inboundDate: action.date };
    }
    default:
      return state;
  }
};

const showLoadingPrevNextInitialState = {
  outboundPrev: false,
  outboundNext: false,
  inboundPrev: false,
  inboundNext: false
};

const showLoadingPrevNext = (state = showLoadingPrevNextInitialState, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE: {
      return { ...state, inboundPrev: true };
    }
    case AirBookingActionTypes.AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE_SUCCESS:
    case AirBookingActionTypes.AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE_FAILED: {
      return { ...state, inboundPrev: false };
    }

    case AirBookingActionTypes.AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE: {
      return { ...state, inboundNext: true };
    }
    case AirBookingActionTypes.AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE_SUCCESS:
    case AirBookingActionTypes.AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE_FAILED: {
      return { ...state, inboundNext: false };
    }

    case AirBookingActionTypes.AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE: {
      return { ...state, outboundPrev: true };
    }
    case AirBookingActionTypes.AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE_SUCCESS:
    case AirBookingActionTypes.AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE_FAILED: {
      return { ...state, outboundPrev: false };
    }

    case AirBookingActionTypes.AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE: {
      return { ...state, outboundNext: true };
    }
    case AirBookingActionTypes.AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE_SUCCESS:
    case AirBookingActionTypes.AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE_FAILED: {
      return { ...state, outboundNext: false };
    }
    default:
      return state;
  }
};

const lowFareCalendarReducers = combineReducers({
  response,
  outboundPage,
  inboundPage,
  selectedDates,
  showLoadingPrevNext
});

export default lowFareCalendarReducers;
