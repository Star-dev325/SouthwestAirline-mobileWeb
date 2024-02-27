import _ from 'lodash';
import { combineReducers } from 'redux';
import { toDynamicPlacement } from 'src/wcm/transformers/wcmTransformer';
import HomeAndNavActionTypes from 'src/homeAndNav/actions/homeAndNavActionTypes';

const placements = (state = [], action = {}) => {
  switch (action.type) {
    case HomeAndNavActionTypes.HOME_NAV__SAVE_OFFERS_PAGE_PLACEMENTS:
    case HomeAndNavActionTypes.HOME_NAV__FETCH_OFFERS_PAGE_PLACEMENTS_SUCCESS: {
      const results = _.get(action, 'response.results');

      const OFFER_KEY_FOLLOWED_BY_NUMBER = /^offer[0-9]+$/;

      return _.keys(results)
        .sort()
        .filter((key = '') => key.match(OFFER_KEY_FOLLOWED_BY_NUMBER))
        .map((key) => toDynamicPlacement(action.response, key));
    }
    default:
      return state;
  }
};

const templateData = (state = {}, action = {}) => {
  switch (action.type) {
    case HomeAndNavActionTypes.HOME_NAV__SAVE_OFFERS_PAGE_TEMPLATE_DATA: {
      return _.get(action, 'templateData') || {};
    }
    default:
      return state;
  }
};

export default combineReducers({ placements, templateData });
