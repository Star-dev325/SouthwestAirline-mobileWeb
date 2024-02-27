import _ from 'lodash';

import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import CheckInActionTypes from 'src/checkIn/actions/checkInActionTypes';
import upgradedBoardingActionTypes from 'src/upgradedBoarding/actions/upgradedBoardingActionTypes';
import { toDynamicPlacement } from 'src/wcm/transformers/wcmTransformer';

export const recentTripSearches = (state = [], action = {}) => {
  switch (action.type) {
    case SharedActionTypes.SHARED__FETCH_RECENT_TRIP_SEARCHES_SUCCESS: {
      const {
        payload: { featureName, recentTripSearches: recentTripSearchesAction }
      } = action;

      return featureName === 'checkIn' ? _.cloneDeep(recentTripSearchesAction) : state;
    }
    default: {
      return state;
    }
  }
};

export const checkInViewReservationPage = (state = null, action = {}) => {
  switch (action.type) {
    case CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS:
    case CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS: {
      return _.cloneDeep(action.response.checkInViewReservationPage);
    }
    default: {
      return state;
    }
  }
};

export const prefillPassengerAPISDocuments = (state = null, action = {}) => {
  switch (action.type) {
    case CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS:
    case CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS: {
      return _.cloneDeep(action.response.prefillPassengerAPISDocuments);
    }
    default: {
      return state;
    }
  }
};

export const checkInConfirmationPage = (state = null, action = {}) => {
  switch (action.type) {
    case upgradedBoardingActionTypes.UPGRADED_BOARDING__FETCH_RESERVATION_SUCCESS:
    case CheckInActionTypes.CHECK_IN__FETCH_CONFIRMATION_PAGE_SUCCESS: {
      const checkInConfirmationPageObj = action.response.checkInConfirmationPage;

      return checkInConfirmationPageObj ? _.cloneDeep(checkInConfirmationPageObj) : null;
    }
    case CheckInActionTypes.CHECK_IN__CLEAR_CONFIRMATION_PAGE: {
      return null;
    }
    default: {
      return state;
    }
  }
};

export const checkInViewBoardingPassPage = (state = null, action = {}) => {
  switch (action.type) {
    case CheckInActionTypes.CHECK_IN__FETCH_BOARDING_PASS_SUCCESS: {
      return _.cloneDeep(action.response.checkInRetrieveBoardingPassPage);
    }
    case CheckInActionTypes.CHECK_IN__CLEAR_BOARDING_PASSES: {
      return _.omit(_.cloneDeep(state), 'mobileBoardingPassViewPage');
    }
    default: {
      return state;
    }
  }
};

export const shouldShowShareLink = (state = false, action = {}) => {
  switch (action.type) {
    case CheckInActionTypes.CHECK_IN__SHOW_SHARE_LINK: {
      return true;
    }
    default: {
      return state;
    }
  }
};

export const checkInConfirmationPagePlacements = (state = {}, action = {}) => {
  switch (action.type) {
    case CheckInActionTypes.CHECK_IN__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS: {
      const checkInConfirmationPromoTop01 = toDynamicPlacement(action.response, 'checkInConfirmationPromoTop01');
      const topBanner01 =  toDynamicPlacement(action.response, 'topBanner01');

      return { checkInConfirmationPromoTop01, topBanner01 };
    }
    default:
      return state;
  }
};
