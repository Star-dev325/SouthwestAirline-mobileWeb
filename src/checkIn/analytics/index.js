import { getOriginDestination } from 'src/checkIn/analytics/analyticsObjectSelector';
import { checkInConfirmationMktgSelector } from 'src/checkIn/analytics/checkInConfirmationMktgSelector';
import {
  generateUpdatedFlowStoreForAnalytics,
  generateFlowActionListForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';
import { mobileBoardingPassMktgSelector } from 'src/checkIn/analytics/mobileBoardingPassMktgSelector';
import { isMultiPax } from 'src/checkIn/analytics/multiPaxSelector';
import { hasMultipleBoardingPasses as hasMultipleTravelerIds } from 'src/checkIn/analytics/travelerIdsSelector';

import CheckInActionTypes from 'src/checkIn/actions/checkInActionTypes';

const {
  CHECK_IN__FETCH_BOARDING_PASS_SUCCESS,
  CHECK_IN__FETCH_CONFIRMATION_PAGE_SUCCESS,
  CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS
} = CheckInActionTypes;

const checkInSelectors = {
  boardingPassView: {
    actions: [CHECK_IN__FETCH_BOARDING_PASS_SUCCESS],
    selector: hasMultipleTravelerIds
  },
  multiPax: {
    actions: [CHECK_IN__FETCH_CONFIRMATION_PAGE_SUCCESS],
    selector: isMultiPax
  },
  details: {
    actions: [CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS, CHECK_IN__FETCH_CONFIRMATION_PAGE_SUCCESS],
    selector: getOriginDestination
  }
};

export const generateCheckInStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(checkInSelectors, state, actionType);

export const analyticsActionsForCheckInStore = generateFlowActionListForAnalytics(checkInSelectors);
export const dataLayerSelectorsForCheckIn = {
  [CHECK_IN__FETCH_BOARDING_PASS_SUCCESS]: mobileBoardingPassMktgSelector,
  [CHECK_IN__FETCH_CONFIRMATION_PAGE_SUCCESS]: checkInConfirmationMktgSelector
};
