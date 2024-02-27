import {
  generateUpdatedFlowStoreForAnalytics,
  generateFlowActionListForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';
import CarBookingActionTypes from 'src/carBooking/actions/carBookingActionTypes';
import { getSearch } from 'src/carBooking/analytics/searchSelector';
import { getCarResult } from 'src/carBooking/analytics/carResultSelector';
import { getCarSelection } from 'src/carBooking/analytics/carSelectionSelector';
import { getPurchase } from 'src/carBooking/analytics/purchaseSelector';

const {
  CAR_BOOKING__SAVE_CAR_RESULTS,
  CAR_BOOKING__FETCH_CARS_SUCCESS,
  CAR_BOOKING__SAVE_FETCH_CARS_REQUEST,
  CAR_BOOKING__SAVE_SELECTED_EXTRAS,
  CAR_BOOKING__FETCH_CAR_PRICING_SUCCESS,
  CAR_BOOKING__BOOK_CAR_SUCCESS,
  CAR_BOOKING__SAVE_USER_ACCOUNT_DRIVER_INFO
} = CarBookingActionTypes;

const carBookingSelectors = {
  search: {
    actions: [CAR_BOOKING__FETCH_CARS_SUCCESS, CAR_BOOKING__SAVE_FETCH_CARS_REQUEST],
    selector: getSearch
  },
  results: {
    actions: [CAR_BOOKING__SAVE_CAR_RESULTS, CAR_BOOKING__SAVE_FETCH_CARS_REQUEST],
    selector: getCarResult
  },
  carSelection: {
    actions: [CAR_BOOKING__SAVE_SELECTED_EXTRAS, CAR_BOOKING__FETCH_CAR_PRICING_SUCCESS],
    selector: getCarSelection
  },
  purchase: {
    actions: [CAR_BOOKING__BOOK_CAR_SUCCESS, CAR_BOOKING__SAVE_USER_ACCOUNT_DRIVER_INFO],
    selector: getPurchase
  }
};

export const generateCarBookingStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(carBookingSelectors, state, actionType);

export const analyticsActionsForCarBookingStore = generateFlowActionListForAnalytics(carBookingSelectors);
