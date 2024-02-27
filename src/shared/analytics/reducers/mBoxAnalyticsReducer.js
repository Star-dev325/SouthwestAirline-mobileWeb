// @flow
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';

const { SHARED__ROUTE_CHANGED } = SharedActionTypes;
const {
  MBOX_ANALYTICS_UPDATE_TOTAL_CALLS,
  MBOX_ANALYTICS_UPDATE_FAILED_CALLS,
  MBOX_ANALYTICS_UPDATE_TIMEOUT_ARTIFACT
} = AnalyticsActionTypes;

type mBoxState = {
  totalMboxCallsCounter: number,
  failedMboxCallsCounter: number,
  mBoxTimeOutArtifact: string
};

const initialState = {
  totalMboxCallsCounter: 0,
  failedMboxCallsCounter: 0,
  mBoxTimeOutArtifact: ''
};

export default (state: mBoxState = initialState, action: * = {}) => {
  switch (action.type) {
    case SHARED__ROUTE_CHANGED:
      return initialState;
    case MBOX_ANALYTICS_UPDATE_TOTAL_CALLS:
      return { ...state, ...action.payload };

    case MBOX_ANALYTICS_UPDATE_FAILED_CALLS:
      return { ...state, ...action.payload };

    case MBOX_ANALYTICS_UPDATE_TIMEOUT_ARTIFACT:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
