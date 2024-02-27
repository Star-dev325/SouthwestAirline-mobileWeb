import _ from 'lodash';
import { combineReducers } from 'redux';
import travelFundActionTypes from 'src/travelFunds/actions/travelFundsActionTypes';
import { toDynamicPlacement } from 'src/wcm/transformers/wcmTransformer';

const {
  TRAVEL_FUNDS__RESET_LOOK_UP_FUNDS_FLOW_DATA,
  TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_FAILED,
  TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS,
  TRAVEL_FUNDS__FETCH_UNUSED_FUNDS,
  TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS,
  TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_SUCCESS,
  TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_FAILED,
  TRAVEL_FUNDS__UPDATE_SELECTED_LOOKUP_TAB,
  TRAVEL_FUNDS__FETCH_VALIDATE_FUNDS_SUCCESS,
  TRAVEL_FUNDS__FETCH_TRANSFER_TRAVEL_FUNDS_SUCCESS,
  TRAVEL_FUNDS__ASSOCIATE_TRAVEL_FUNDS_SUCCESS,
  TRAVEL_FUNDS__SAVE_PREV_SEARCH,
  TRAVEL_FUNDS__RESUME_AFTER_LOGIN,
  TRAVEL_FUNDS__FETCH_TRAVEL_FUNDS_PAGE_PLACEMENTS_SUCCESS
} = travelFundActionTypes;

const currentlySelectedTab = (state, action) => {
  state = state || 'travel-funds';

  switch (action.type) {
    case TRAVEL_FUNDS__UPDATE_SELECTED_LOOKUP_TAB: {
      return action.selection;
    }
    default:
      return state;
  }
};

const defaultViewTravelFund = {
  retrievedFunds: []
};

const viewTravelFund = (state = defaultViewTravelFund, action = {}) => {
  switch (action.type) {
    case TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS:
    case TRAVEL_FUNDS__FETCH_UNUSED_FUNDS: {
      return defaultViewTravelFund;
    }
    case TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_SUCCESS:
    case TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS: {
      const {
        response: { viewTravelFund: retrievedFunds = [], mktg_data }
      } = action;

      return _.merge({}, { retrievedFunds, mktg_data });
    }
    case TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_FAILED:
    case TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_FAILED: {
      return defaultViewTravelFund;
    }
    default:
      return state;
  }
};

const validateFunds = (state = {}, action = {}) => {
  switch (action.type) {
    case TRAVEL_FUNDS__FETCH_VALIDATE_FUNDS_SUCCESS: {
      return action.response;
    }
    default:
      return state;
  }
};

const transferTravelFundsConfirmation = (state = {}, action = {}) => {
  switch (action.type) {
    case TRAVEL_FUNDS__FETCH_TRANSFER_TRAVEL_FUNDS_SUCCESS: {
      return action.response;
    }
    default:
      return state;
  }
};

const associateFundsMessage = (state = {}, action = {}) => {
  switch (action.type) {
    case TRAVEL_FUNDS__ASSOCIATE_TRAVEL_FUNDS_SUCCESS: {
      return action.response;
    }
    case TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS:
    case TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_SUCCESS: {
      return _.get(action, 'response.isRefreshCall', false) ? state : {};
    }
    default:
      return state;
  }
};

const message = (state, action) => {
  state = state || null;

  switch (action.type) {
    case TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_SUCCESS: {
      const { response } = action;

      return response.message ? response.message : null;
    }
    case TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS: {
      return null;
    }
    default:
      return state;
  }
};

const previousTravelFundsSearch = (state = {}, action = {}) => {
  switch (action.type) {
    case TRAVEL_FUNDS__SAVE_PREV_SEARCH: {
      return action.request;
    }
    default:
      return state;
  }
};

const resumeAfterLogin = (state = {}, action = {}) => {
  switch (action.type) {
    case TRAVEL_FUNDS__RESUME_AFTER_LOGIN: {
      const { shouldResume, requestInfo } = action;

      return {
        shouldResume,
        requestInfo
      };
    }
    default:
      return state;
  }
};

const placements = (state = [], action = {}) => {
  switch (action.type) {
    case TRAVEL_FUNDS__FETCH_TRAVEL_FUNDS_PAGE_PLACEMENTS_SUCCESS: {
      const results = _.get(action, 'response.results');
      const TRAVEL_FUNDS_KEY_FOLLOWED_BY_NUMBER = /^contentModule[0-9]+$/;

      return _.keys(results)
        .sort()
        .filter((key = '') => key.match(TRAVEL_FUNDS_KEY_FOLLOWED_BY_NUMBER))
        .map((key) => toDynamicPlacement(action.response, key));
    }
    default:
      return state;
  }
};

const lookupTravelFundsReducers = combineReducers({
  viewTravelFund,
  message,
  currentlySelectedTab,
  validateFunds,
  transferTravelFundsConfirmation,
  associateFundsMessage,
  previousTravelFundsSearch,
  resumeAfterLogin,
  placements
});

export default (state, action) => {
  if (action.type === TRAVEL_FUNDS__RESET_LOOK_UP_FUNDS_FLOW_DATA) {
    return lookupTravelFundsReducers(undefined, '@@INIT');
  }

  return lookupTravelFundsReducers(state, action);
};
