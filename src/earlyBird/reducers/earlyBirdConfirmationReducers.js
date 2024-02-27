import _ from 'lodash';
import { combineReducers } from 'redux';
import EarlyBirdActions from 'src/earlyBird/actions/earlyBirdActionTypes';

const { EARLY_BIRD__FETCH_PURCHASE_SUCCESS } = EarlyBirdActions;

const responseReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case EARLY_BIRD__FETCH_PURCHASE_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    default:
      return state;
  }
};

export default combineReducers({
  response: responseReducer
});
