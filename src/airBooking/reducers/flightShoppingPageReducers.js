import _ from 'lodash';
import { combineReducers } from 'redux';

import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import { generateFlightShoppingPages } from 'src/airBooking/helpers/flightShoppingPageHelper';
import SortingOptions from 'src/shared/constants/sortingOptions';

const { DEFAULT_SHOPPING_SORT_SELECT_VALUE, STARTING_FROM_AMOUNT, DEPARTURE_TIME } = SortingOptions;
const initStateForSortBy = {
  adult: {
    inbound: DEFAULT_SHOPPING_SORT_SELECT_VALUE,
    outbound: DEFAULT_SHOPPING_SORT_SELECT_VALUE
  }
};

const pages = (state = [], action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS: {
      return generateFlightShoppingPages(action.response);
    }
    case AirBookingActionTypes.AIR_BOOKING__SORT_FLIGHT_SHOPPING_PAGE_BY: {
      const { direction, paxType, sortBy: sortByFlightShoppingPage } = action;
      const currentPageIndex = _.findIndex(state, { direction, paxType });
      const sortStrategies = [
        {
          key: `_meta.${sortByFlightShoppingPage}`,
          order: 'asc'
        },
        {
          key: `_meta.${DEPARTURE_TIME}`,
          order: 'asc'
        }
      ];

      if (sortByFlightShoppingPage === STARTING_FROM_AMOUNT) {
        sortStrategies.unshift({
          key: 'reasonIfUnavailable',
          order: 'desc'
        });
      }

      const cards = _.orderBy(
        state[currentPageIndex] && state[currentPageIndex].cards,
        _.map(sortStrategies, 'key'),
        _.map(sortStrategies, 'order')
      );

      return _.map(state, (page, pageIndex) => {
        if (pageIndex === currentPageIndex) {
          return {
            ...page,
            cards
          };
        }

        return page;
      });
    }
    default:
      return state;
  }
};

const response = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    case AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE: {
      return _.merge({}, state, {
        flightShoppingPage: {
          _analytics: null
        }
      });
    }
    case AirBookingActionTypes.AIR_BOOKING__RESET_FLIGHT_PRICING_PAGE_RESPONSE: {
      return {};
    }
    default:
      return state;
  }
};

const sortBy = (state = initStateForSortBy, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SORT_FLIGHT_SHOPPING_PAGE_BY: {
      const { sortBy: sortByValue, direction, paxType } = action;

      return {
        ...state,
        [paxType]: {
          ...state[paxType],
          [direction]: sortByValue
        }
      };
    }
    case AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE: {
      return _.cloneDeep(initStateForSortBy);
    }
    default:
      return state;
  }
};

const multiSelectGroup = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_MULTI_SELECT_PAGE_SUCCESS: {
      return {
        ...state,
        response: action.response
      };
    }

    case AirBookingActionTypes.AIR_BOOKING__UPDATE_MULTI_SELECT_BOUND: {
      return {
        ...state,
        selectedBound: action.multiSelectAirportBounds
      };
    }
    case AirBookingActionTypes.AIR_BOOKING__CLEAR_MULTI_SELECT_BOUND: {
      return {
        ...state,
        selectedBound: {
          destinationBoundAirport: '',
          originBoundAirport: ''
        }
      };
    }
    default:
      return state;
  }
};

const flightShoppingPageReducers = combineReducers({
  pages,
  sortBy,
  response,
  multiSelectGroup
});

export default (state, action = {}) => {
  if (action.type === AirBookingActionTypes.AIR_BOOKING__RESUME_AIR_BOOKING_FLOW_DATA) {
    return action.airBookingDataToResume.flightShoppingPage;
  }

  return flightShoppingPageReducers(state, action);
};
