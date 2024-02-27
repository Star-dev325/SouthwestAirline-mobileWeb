import { combineReducers } from 'redux';
import _ from 'lodash';

import MyAccountActionTypes from 'src/myAccount/actions/myAccountActionTypes';
import { toDynamicPlacement } from 'src/wcm/transformers/wcmTransformer';

const { MY_ACCOUNT__RESET_FLOW_DATA } = MyAccountActionTypes;

const {
  MY_ACCOUNT__FETCH_PAST_FLIGHTS_SUCCESS,
  MY_ACCOUNT__CLEAR_PAST_FLIGHTS,
  MY_ACCOUNT__FETCH_SAVED_FLIGHTS_SUCCESS,
  MY_ACCOUNT__CLEAR_SAVED_FLIGHTS,
  MY_ACCOUNT__SET_TRIP_TYPE,
  MY_ACCOUNT__FETCH_RAPID_REWARDS_INFO_SUCCESS,
  MY_ACCOUNT__CLEAR_RAPID_REWARDS_INFO,
  MY_ACCOUNT__FETCH_ACCOUNT_INFO_SUCCESS,
  MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS,
  MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS_SUCCESS,
  MY_ACCOUNT__FETCH_PROMOTION_DETAILS,
  MY_ACCOUNT__FETCH_PROMOTION_DETAILS_SUCCESS,
  MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS_SUCCESS,
  MY_ACCOUNT__FETCH_RAPID_REWARDS_PAGE_PLACEMENTS_SUCCESS,
  MY_ACCOUNT__FETCH_PROMO_CODES_SUCCESS,
  MY_ACCOUNT__FETCH_PROMO_CODES_PAGE_PLACEMENTS_SUCCESS,
  MY_ACCOUNT__CLEAR_PROMO_CODES
} = MyAccountActionTypes;

const savedFlightsPage = (state = null, action = {}) => {
  switch (action.type) {
    case MY_ACCOUNT__FETCH_SAVED_FLIGHTS_SUCCESS: {
      return _.cloneDeep(action.response.savedFlightsPage);
    }
    case MY_ACCOUNT__CLEAR_SAVED_FLIGHTS:
      return null;
    default:
      return state;
  }
};

const pastFlightsPage = (state = null, action = {}) => {
  switch (action.type) {
    case MY_ACCOUNT__FETCH_PAST_FLIGHTS_SUCCESS: {
      return _.cloneDeep(action.response.pastFlightsPage);
    }
    case MY_ACCOUNT__CLEAR_PAST_FLIGHTS:
      return null;
    default:
      return state;
  }
};

const myAccountPromoCodes = (state = null, action = {}) => {
  switch (action.type) {
    case MY_ACCOUNT__FETCH_PROMO_CODES_SUCCESS: {
      return { ...action.response };
    }
    case MY_ACCOUNT__CLEAR_PROMO_CODES:
      return null;
    default:
      return state;
  }
};

const tripType = (state = null, action = {}) => {
  switch (action.type) {
    case MY_ACCOUNT__SET_TRIP_TYPE: {
      return action.tripType;
    }
    default:
      return state;
  }
};

const rapidRewardsInfo = (state = null, action = {}) => {
  switch (action.type) {
    case MY_ACCOUNT__FETCH_RAPID_REWARDS_INFO_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    case MY_ACCOUNT__CLEAR_RAPID_REWARDS_INFO:
      return null;
    default:
      return state;
  }
};

const customerAccountInfo = (state = null, action = {}) => {
  switch (action.type) {
    case MY_ACCOUNT__FETCH_ACCOUNT_INFO_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    default:
      return state;
  }
};

const exclusivePromotions = (state = null, action = {}) => {
  switch (action.type) {
    case MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS: {
      return null;
    }
    case MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    default:
      return state;
  }
};

const exclusivePromotionDetailsPage = (state = null, action = {}) => {
  switch (action.type) {
    case MY_ACCOUNT__FETCH_PROMOTION_DETAILS: {
      return null;
    }
    case MY_ACCOUNT__FETCH_PROMOTION_DETAILS_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    default:
      return state;
  }
};

const accountPagePlacements = (state = null, action = {}) => {
  switch (action.type) {
    case MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS_SUCCESS: {
      const banner01 = toDynamicPlacement(action.response, 'banner01');
      const unusedFundsContentModule = _.cloneDeep(
        action.response.results.unusedFundsContentModule.content.placement.childContent
      );
      const promoCodeContentModule = _.cloneDeep(
        action.response.results?.promoCodeContentModule?.content?.placement?.childContent
      );

      return {
        banner01,
        unusedFundsContentModule,
        promoCodeContentModule
      };
    }
    default:
      return state;
  }
};

const myAccountRapidRewardsPagePlacements = (state = null, action = {}) => {
  switch (action.type) {
    case MY_ACCOUNT__FETCH_RAPID_REWARDS_PAGE_PLACEMENTS_SUCCESS: {
      const rrSummaryChaseCompanionQualifyingPointsInfo = toDynamicPlacement(
        action.response,
        'rrSummaryChaseCompanionQualifyingPointsInfo'
      );

      return { rrSummaryChaseCompanionQualifyingPointsInfo };
    }
    default:
      return state;
  }
};

const promoCodesPagePlacements = (state = null, action = {}) => {
  switch (action.type) {
    case MY_ACCOUNT__FETCH_PROMO_CODES_PAGE_PLACEMENTS_SUCCESS: {
      const promoTop01 = toDynamicPlacement(action.response, 'promoTop01');

      return { promoTop01 };
    }
    default:
      return state;
  }
};

const myAccountReducers = combineReducers({
  pastFlightsPage,
  savedFlightsPage,
  tripType,
  rapidRewardsInfo,
  customerAccountInfo,
  exclusivePromotions,
  exclusivePromotionDetailsPage,
  myAccountPromoCodes,
  accountPagePlacements,
  promoCodesPagePlacements,
  myAccountRapidRewardsPagePlacements
});

const myAccount = (state = {}, action = {}) => {
  if (action.type === MY_ACCOUNT__RESET_FLOW_DATA) {
    return myAccountReducers(undefined, action);
  }

  return myAccountReducers(state, action);
};

export default myAccount;
