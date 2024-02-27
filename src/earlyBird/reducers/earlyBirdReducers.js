import _ from 'lodash';
import earlyBirdActionTypes from 'src/earlyBird/actions/earlyBirdActionTypes';

import { toDynamicPlacement } from 'src/wcm/transformers/wcmTransformer';

const {
  EARLY_BIRD__SAVE_PAYMENT_INFO,
  EARLY_BIRD__RESET_PAYMENT_INFO,
  EARLY_BIRD__FETCH_EARLYBIRD_BANNER_PLACEMENTS_SUCCESS
} = earlyBirdActionTypes;

export const paymentInfo = (state = {}, action = {}) => {
  switch (action.type) {
    case EARLY_BIRD__RESET_PAYMENT_INFO: {
      return {};
    }
    case EARLY_BIRD__SAVE_PAYMENT_INFO: {
      return _.cloneDeep(action.paymentInfo);
    }
    default: {
      return state;
    }
  }
};

export const earlyBirdBanner = (state = {}, action = {}) => {
  switch (action.type) {
    case EARLY_BIRD__FETCH_EARLYBIRD_BANNER_PLACEMENTS_SUCCESS: {
      const response = _.get(action, 'response', null);
      const promoTop01 = toDynamicPlacement(response, 'promoTop01');

      return { promoTop01 };
    }
    default: {
      return state;
    }
  }
};
