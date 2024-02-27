import _ from 'lodash';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';

const {
  SHARED__ASYNC_ACTION_START,
  SHARED__ASYNC_ACTION_FINISH,
  SHARED__ASYNC_CHAIN_CONTINUE,
  SHARED__ASYNC_CHAIN_FINISH,
  SHARED__ASYNC_CHAIN_INIT_TIMER,
  SHARED__ASYNC_CHAIN_START,
  SHARED__FORCE_HIDE_SPINNER,
  SHARED__HIDE_SPINNER_TEMPORARILY,
  SHARED__ROUTE_CHANGED
} = SharedActionTypes;

function shouldShowSpinner(count) {
  return count > 0;
}

const defaultChainMessageDuration = 5000;

const initialState = { 
  asyncActionCount: 0, 
  asyncChain: false,
  asyncChainTimerID: null,
  chainMessageCount: 0,
  chainMessageDuration: defaultChainMessageDuration,
  chainMessages: null,
  showSpinner: true, 
  spinnerMessage: null
};

export const spinner = (state = initialState, action = {}) => {
  const { asyncActionCount, chainMessageCount } = state;

  switch (action.type) {
    case SHARED__ASYNC_ACTION_START: {
      const count = asyncActionCount + 1;

      return {
        ...state,
        asyncActionCount: count,
        showSpinner: shouldShowSpinner(count),
        spinnerMessage: _.get(action, 'spinnerMessage', null)
      };
    }
    case SHARED__ASYNC_ACTION_FINISH: {
      const count = Math.max(asyncActionCount - 1, 0);

      return {
        ...state,
        asyncActionCount: count,
        showSpinner: shouldShowSpinner(count),
        spinnerMessage: null
      };
    }
    case SHARED__ASYNC_CHAIN_START: {
      const count = asyncActionCount + 1;

      return {
        ...state,
        asyncActionCount: count,
        asyncChain: true,
        asyncChainTimerID: null,
        chainMessageCount: 0,
        chainMessageDuration: action.chainMessageDuration || defaultChainMessageDuration,
        chainMessages: action.chainMessages,
        showSpinner: shouldShowSpinner(count)
      };
    }
    case SHARED__ASYNC_CHAIN_INIT_TIMER: {
      return {
        ...state,
        asyncChainTimerID: action.asyncChainTimerID
      };
    }
    case SHARED__ASYNC_CHAIN_CONTINUE: {
      return {
        ...state,
        asyncChainTimerID: action.asyncChainTimerID,
        chainMessageCount: chainMessageCount + 1
      };
    }
    case SHARED__ASYNC_CHAIN_FINISH: {
      const count = Math.max(asyncActionCount - 1, 0);

      return {
        ...state,
        asyncActionCount: count,
        asyncChain: false,
        asyncChainTimerID: null,
        chainMessageCount: 0,
        chainMessageDuration: defaultChainMessageDuration,
        chainMessages: null,
        showSpinner: shouldShowSpinner(count),
        spinnerMessages: null
      };
    }
    case SHARED__ROUTE_CHANGED: {
      return {
        ...state,
        showSpinner: shouldShowSpinner(asyncActionCount),
        spinnerMessage: null
      };
    }
    case SHARED__HIDE_SPINNER_TEMPORARILY: {
      return {
        ...state,
        showSpinner: false,
        spinnerMessage: null
      };
    }
    case SHARED__FORCE_HIDE_SPINNER: {
      return {
        ...state,
        asyncActionCount: Math.min(asyncActionCount, action.pendingCallsCount) - asyncActionCount,
        showSpinner: false,
        spinnerMessage: null
      };
    }
    default:
      return state;
  }
};
