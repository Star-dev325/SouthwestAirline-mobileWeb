import _ from 'lodash';
import Actions from 'src/contactTracing/actions/contactTracingActionTypes';

const {
  CONTACT_TRACING__SEARCH_REQUEST,
  CONTACT_TRACING__PASSENGER_INDEX,
  CONTACT_TRACING__PASSENGER_TO_APPLY_TO_ALL,
  CONTACT_TRACING__RESET_DATA,
  CONTACT_TRACING__FETCH_CONTACT_TRACING_SUCCESS
} = Actions;

export default (state = {}, action = {}) => {
  switch (action.type) {
    case CONTACT_TRACING__FETCH_CONTACT_TRACING_SUCCESS: {
      return _.cloneDeep({
        ...state,
        response: action.response
      });
    }
    case CONTACT_TRACING__SEARCH_REQUEST: {
      return {
        ..._.cloneDeep(action.request),
        passengerIndex: 0
      };
    }
    case CONTACT_TRACING__PASSENGER_INDEX: {
      return _.cloneDeep({
        ...state,
        passengerIndex: action.passengerIndex
      });
    }
    case CONTACT_TRACING__PASSENGER_TO_APPLY_TO_ALL: {
      return _.cloneDeep({
        ...state,
        passengerToApplyToAll: action.passengerToApplyToAll
      });
    }
    case CONTACT_TRACING__RESET_DATA: {
      return {};
    }
    default: {
      return state;
    }
  }
};
