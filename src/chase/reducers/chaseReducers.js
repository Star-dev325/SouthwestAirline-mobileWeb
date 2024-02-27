import { combineReducers } from 'redux';
import ChaseActionTypes from 'src/chase/actions/chaseActionTypes';

const applicationInfo = (state = {}, action = {}) => {
  switch (action.type) {
    case ChaseActionTypes.CHASE__FETCH_APPLICATION_STATUS_SUCCESS: {
      return { ...action.response.applicationInfo };
    }
    case ChaseActionTypes.CHASE__RESET_CHASE_APPLICATION_INFO: {
      return {};
    }
    default:
      return state;
  }
};

const isChaseExistingCardMember = (state = null, action = {}) => {
  switch (action.type) {
    case ChaseActionTypes.CHASE__SET_CHASE_EXISTING_CARD_MEMBER:
      return action.isChaseExistingCardMember;
    default:
      return state;
  }
};

const shouldRetryInstantCreditsCall = (state = false, action = {}) => {
  switch (action.type) {
    case ChaseActionTypes.CHASE__SET_SHOULD_RETRY_INSTANT_CREDITS_CALL: {
      return action.shouldSetRetryInstantCreditsCall;
    }
    case ChaseActionTypes.CHASE__FETCH_APPLICATION_STATUS_FAILED: {
      return true;
    }
    case ChaseActionTypes.CHASE__RESET_CHASE_APPLICATION_INFO: {
      return false;
    }
    default:
      return state;
  }
};

const chaseReducers = combineReducers({
  applicationInfo,
  isChaseExistingCardMember,
  shouldRetryInstantCreditsCall
});

export default chaseReducers;
