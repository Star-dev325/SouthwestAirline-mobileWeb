import _ from 'lodash';
import { combineReducers } from 'redux';
import airChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';

import SortingOptions from 'src/shared/constants/sortingOptions';

const {
  AIR_CHANGE__FETCH_FLIGHT_SHOPPING_SUCCESS,
  AIR_CHANGE__SORT_SHOPPING_PAGE_BY,
  AIR_CHANGE__FETCH_FLIGHT_SHOPPING,
  AIR_CHANGE__SAVE_SELECTED_PRODUCTS,
  AIR_CHANGE__CLEAR_SELECTED_PRODUCTS,
  AIR_CHANGE__SAVE_SHOPPING_SEARCH_REQUEST
} = airChangeActionTypes;

export const initStateForSortBy = {
  inbound: SortingOptions.DEFAULT_SHOPPING_SORT_SELECT_VALUE,
  outbound: SortingOptions.DEFAULT_SHOPPING_SORT_SELECT_VALUE
};

const response = (state = {}, action = {}) => {
  switch (action.type) {
    case AIR_CHANGE__FETCH_FLIGHT_SHOPPING_SUCCESS: {
      return _.cloneDeep(_.get(action, 'response.changeShoppingPage', {}));
    }
    default:
      return state;
  }
};

const sortBy = (state = initStateForSortBy, action = {}) => {
  switch (action.type) {
    case AIR_CHANGE__SORT_SHOPPING_PAGE_BY: {
      const { sortStrategy, direction } = action;

      return {
        ...state,
        [direction]: sortStrategy
      };
    }
    case AIR_CHANGE__FETCH_FLIGHT_SHOPPING: {
      return _.cloneDeep(initStateForSortBy);
    }
    default:
      return state;
  }
};

const searchRequest = (state = {}, action = {}) => {
  switch (action.type) {
    case AIR_CHANGE__SAVE_SHOPPING_SEARCH_REQUEST: {
      return _.cloneDeep(action.searchRequest);
    }
    default:
      return state;
  }
};

const selectedProducts = (state = {}, action = {}) => {
  switch (action.type) {
    case AIR_CHANGE__SAVE_SELECTED_PRODUCTS: {
      return _.cloneDeep(action.selectedProducts);
    }
    case AIR_CHANGE__CLEAR_SELECTED_PRODUCTS:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  response,
  sortBy,
  searchRequest,
  selectedProducts
});
