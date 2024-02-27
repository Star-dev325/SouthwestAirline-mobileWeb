// @flow
import { combineReducers } from 'redux';

import ChaseActionTypes from 'src/chase/actions/chaseActionTypes';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';

import { DEFAULT_OFFERS } from 'src/chase/constants/chaseConstants';

import type { ChaseCodes } from 'src/shared/flow-typed/shared.types';

const offers = (state: ChaseCodes = DEFAULT_OFFERS, action: * = {}) => {
  switch (action.type) {
    case AnalyticsActionTypes.CHASE_ANALYTICS__UPDATE_CHASE_CODES:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

const chasebannershown = (state = false, action = {}) => {
  switch (action.type) {
    case ChaseActionTypes.CHASE__SET_CHASE_BANNER_SHOWN: {
      return !!action.isChaseBannerShown;
    }
    case SharedActionTypes.SHARED__ROUTE_CHANGED: {
      return false;
    }
    default:
      return state;
  }
};

const chaseflowcompleted = (state = false, action = {}) => {
  switch (action.type) {
    case ChaseActionTypes.CHASE__UPDATE_CHASE_FLOW_COMPLETED: {
      return !!action.isChaseFlowCompleted;
    }
    default:
      return state;
  }
};

const creditStatus = (state = '', action: * = {}) => {
  switch (action.type) {
    case ChaseActionTypes.CHASE__SET_CHASE_CREDIT_STATUS: {
      return action.creditStatus;
    }
    default:
      return state;
  }
};

export default combineReducers({ offers, chasebannershown, chaseflowcompleted, creditStatus });
