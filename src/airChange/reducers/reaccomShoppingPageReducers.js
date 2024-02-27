import _ from 'lodash';
import { combineReducers } from 'redux';
import airChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';
import { initStateForSortBy } from 'src/airChange/reducers/changeShoppingPageReducers';

const {
  AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE,
  AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING_SUCCESS,
  AIR_CHANGE__REACCOM_CLEAR_SELECTED_PRODUCTS,
  AIR_CHANGE__REACCOM_SAVE_SELECTED_PRODUCTS,
  AIR_CHANGE__REACCOM_SORT_SHOPPING_PAGE_BY,
  AIR_CHANGE__SAVE_REACCOM_COTERMINAL_PRODUCTS
} = airChangeActionTypes;

const response = (state = {}, action = {}) => {
  switch (action.type) {
    case AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING_SUCCESS: {
      return _.cloneDeep(_.get(action, 'response.reaccomShoppingPage', {}));
    }
    default:
      return state;
  }
};

const sortBy = (state = initStateForSortBy, action = {}) => {
  switch (action.type) {
    case AIR_CHANGE__REACCOM_SORT_SHOPPING_PAGE_BY: {
      const { sortStrategy, direction } = action;

      return {
        ...state,
        [direction]: sortStrategy
      };
    }
    case AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE: {
      return _.cloneDeep(initStateForSortBy);
    }
    default:
      return state;
  }
};

const selectedProducts = (state = {}, action = {}) => {
  switch (action.type) {
    case AIR_CHANGE__REACCOM_SAVE_SELECTED_PRODUCTS: {
      return _.cloneDeep(action.selectedProducts);
    }
    case AIR_CHANGE__REACCOM_CLEAR_SELECTED_PRODUCTS:
      return {};
    default:
      return state;
  }
};

const reaccomCoTerminalProducts = (state = {}, action = {}) => {
  switch (action.type) {
    case AIR_CHANGE__SAVE_REACCOM_COTERMINAL_PRODUCTS: {
      return action.reaccomCoTerminalProducts;
    }
    default:
      return state;
  }
};

export default combineReducers({
  reaccomCoTerminalProducts,
  response,
  selectedProducts,
  sortBy
});
