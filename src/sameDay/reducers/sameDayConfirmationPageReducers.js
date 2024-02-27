import { combineReducers } from 'redux';
import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';
import { toDynamicPlacement } from 'src/wcm/transformers/wcmTransformer';

const {
  SAME_DAY__FETCH_CONFIRMATION_PAGE_PLACEMENTS,
  SAME_DAY__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_SUCCESS,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND_SUCCESS
} = SameDayActionTypes;

const placement = (state = {}, action = {}) => {
  switch (action.type) {
    case SAME_DAY__FETCH_CONFIRMATION_PAGE_PLACEMENTS:
      return {};

    case SAME_DAY__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS: {
      const sameDayConfirmationContentModule1 = toDynamicPlacement(action.response, 'ContentModule1');

      return { sameDayConfirmationContentModule1 };
    }

    default:
      return state;
  }
};

const response = (state = {}, action = {}) => {
  switch (action.type) {
    case SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION:
    case SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND:
      return {};

    case SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_SUCCESS:
    case SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND_SUCCESS:
      return { ...action.response };

    default:
      return state;
  }
};

export default combineReducers({ placement, response });
