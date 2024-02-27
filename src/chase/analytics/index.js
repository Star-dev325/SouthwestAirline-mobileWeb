import chaseAnalyticsSelector from 'src/chase/analytics/chaseAnalyticsSelector';
import {
  generateUpdatedFlowStoreForAnalytics,
  generateFlowActionListForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';
import ChaseActionTypes from 'src/chase/actions/chaseActionTypes';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';

const { CHASE__SET_CHASE_BANNER_SHOWN, CHASE__UPDATE_CHASE_FLOW_COMPLETED, CHASE__SET_CHASE_CREDIT_STATUS } =
  ChaseActionTypes;
const { SHARED__ROUTE_CHANGED } = SharedActionTypes;
const { CHASE_ANALYTICS__UPDATE_CHASE_CODES } = AnalyticsActionTypes;

const chaseSelectors = {
  chase: {
    actions: [
      CHASE_ANALYTICS__UPDATE_CHASE_CODES,
      CHASE__SET_CHASE_BANNER_SHOWN,
      CHASE__SET_CHASE_CREDIT_STATUS,
      CHASE__UPDATE_CHASE_FLOW_COMPLETED,
      SHARED__ROUTE_CHANGED
    ],
    selector: chaseAnalyticsSelector
  }
};

export const generateUpdatedChaseBookingStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(chaseSelectors, state, actionType);

export const analyticsActionsForChaseBooking = generateFlowActionListForAnalytics(chaseSelectors);
