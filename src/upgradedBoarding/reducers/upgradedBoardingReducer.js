import _ from 'lodash';
import { combineReducers } from 'redux';
import upgradedBoardingActionTypes from 'src/upgradedBoarding/actions/upgradedBoardingActionTypes';
import { toDynamicPlacement } from 'src/wcm/transformers/wcmTransformer';

const {
  UPGRADED_BOARDING__FETCH_PURCHASE_PAGE_PLACEMENTS_SUCCESS,
  UPGRADED_BOARDING__FETCH_PURCHASE_SUCCESS,
  UPGRADED_BOARDING__FETCH_RESERVATION_SUCCESS,
  UPGRADED_BOARDING__FETCH_UPGRADED_BOARDING_PAGE_PLACEMENTS_SUCCESS,
  UPGRADED_BOARDING__RESET_COUNTDOWN_TIMESTAMP,
  UPGRADED_BOARDING__RESET_PAYMENT_INFO,
  UPGRADED_BOARDING__SAVE_COUNTDOWN_TIMESTAMP,
  UPGRADED_BOARDING__SAVE_MONEY_TOTAL,
  UPGRADED_BOARDING__SAVE_PAYMENT_INFO
} = upgradedBoardingActionTypes;

const upgradedBoardingPagePlacements = (state = {}, action = {}) => {
  switch (action.type) {
    case UPGRADED_BOARDING__FETCH_UPGRADED_BOARDING_PAGE_PLACEMENTS_SUCCESS: {
      const promoTop01 = toDynamicPlacement(action.response, 'promoTop01');
      const contentModule1 = toDynamicPlacement(action.response, 'ContentModule1');
      const promoBottom01 = toDynamicPlacement(action.response, 'promoBottom01');

      return { promoTop01, contentModule1, promoBottom01 };
    }
    default:
      return state;
  }
};

const purchasePagePlacements = (state = {}, action = {}) => {
  switch (action.type) {
    case UPGRADED_BOARDING__FETCH_PURCHASE_PAGE_PLACEMENTS_SUCCESS: {
      const promoTop01 = toDynamicPlacement(action.response, 'promoTop01');

      return { promoTop01 };
    }
    default:
      return state;
  }
};

const upgradedBoardingResponse = (state = {}, action = {}) => {
  switch (action.type) {
    case UPGRADED_BOARDING__FETCH_RESERVATION_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    default:
      return state;
  }
};

const paymentInfo = (state = {}, action = {}) => {
  switch (action.type) {
    case UPGRADED_BOARDING__SAVE_PAYMENT_INFO: {
      return _.cloneDeep(action.paymentInfo);
    }
    case UPGRADED_BOARDING__RESET_PAYMENT_INFO: {
      return {};
    }
    default: {
      return state;
    }
  }
};

const upgradedBoardingPurchaseResponse = (state = {}, action = {}) => {
  switch (action.type) {
    case UPGRADED_BOARDING__FETCH_PURCHASE_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    default:
      return state;
  }
};

const DEFAULT_MONEY_TOTAL = {
  amount: '0.00',
  currencyCode: 'USD',
  currencySymbol: '$'
};

const moneyTotal = (state = DEFAULT_MONEY_TOTAL, action = {}) => {
  switch (action.type) {
    case UPGRADED_BOARDING__SAVE_MONEY_TOTAL:
      return _.cloneDeep(action.moneyTotal);
    default:
      return state;
  }
};

const upgradedBoardingCountdownTimeStamp = (state = null, action = {}) => {
  switch (action.type) {
    case UPGRADED_BOARDING__SAVE_COUNTDOWN_TIMESTAMP:
      return action.timeStamp;
    case UPGRADED_BOARDING__RESET_COUNTDOWN_TIMESTAMP:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  upgradedBoardingPagePlacements,
  purchasePagePlacements,
  upgradedBoardingResponse,
  paymentInfo,
  upgradedBoardingPurchaseResponse,
  upgradedBoardingCountdownTimeStamp,
  moneyTotal
});
