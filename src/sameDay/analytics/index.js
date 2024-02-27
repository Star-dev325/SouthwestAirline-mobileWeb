import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';
import { sameDayCancelConfirmationPageMktgSelector } from 'src/sameDay/analytics/cancelStandbyConfirmationMktgSelector';
import { sameDayConfirmationPageMktgSelector } from 'src/sameDay/analytics/sameDayConfirmationPageMktgSelector';
import { sameDayFlightDetailsMktgSelector } from 'src/sameDay/analytics/sameDayFlightDetailsMktgSelector';
import { sameDayPaymentPageMktgSelector } from 'src/sameDay/analytics/sameDayPaymentPageMktgSelector';
import { sameDayApplySortFilterMktgSelector } from 'src/sameDay/analytics/sameDayApplySortFilterMktgSelector';
import { sameDayPriceDifferencePageMktgSelector } from 'src/sameDay/analytics/sameDayPriceDifferencePageMktgSelector';
import { sameDayRefundPageMktgSelector } from 'src/sameDay/analytics/sameDayRefundPageMktgSelector';
import { sameDaySelectFarePageMktgSelector } from 'src/sameDay/analytics/sameDaySelectFarePageMktgSelector';
import { sameDaySelectFlightPageMktgSelector } from 'src/sameDay/analytics/sameDaySelectFlightPageMktgSelector';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

const {
  SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO_SUCCESS,
  SAME_DAY__FETCH_SAME_DAY_PRICING_INFO_SUCCESS,
  SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_SUCCESS,
  SAME_DAY__SAVE_SELECTED_FLIGHT,
  SAME_DAY__SHOPPING_PAGE_APPLY_SORT_FILTER,
  SAME_DAY__UPDATE_SAME_DAY_CANCELLATION_SUCCESS,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND_SUCCESS,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_SUCCESS
} = SameDayActionTypes;

const { TRACE_SAME_DAY_PAYMENT_TYPE } = AnalyticsActionTypes;

export const dataLayerSelectorsForSameDay = {
  [SAME_DAY__FETCH_SAME_DAY_FLIGHT_DETAILS_INFO_SUCCESS]: sameDayFlightDetailsMktgSelector,
  [SAME_DAY__FETCH_SAME_DAY_PRICING_INFO_SUCCESS]: sameDayPriceDifferencePageMktgSelector,
  [SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_SUCCESS]: sameDaySelectFlightPageMktgSelector,
  [SAME_DAY__SAVE_SELECTED_FLIGHT]: sameDaySelectFarePageMktgSelector,
  [SAME_DAY__UPDATE_SAME_DAY_CANCELLATION_SUCCESS]: sameDayCancelConfirmationPageMktgSelector,
  [SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND_SUCCESS]: sameDayRefundPageMktgSelector,
  [SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_SUCCESS]: sameDayConfirmationPageMktgSelector,
  [SAME_DAY__SHOPPING_PAGE_APPLY_SORT_FILTER]: sameDayApplySortFilterMktgSelector,
  [TRACE_SAME_DAY_PAYMENT_TYPE]: sameDayPaymentPageMktgSelector
};
