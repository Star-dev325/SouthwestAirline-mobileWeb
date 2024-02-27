import {
  generateFlowActionListForAnalytics, 
  generateUpdatedFlowStoreForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';
import StandbyActionTypes from 'src/standby/actions/standbyActionTypes';
import { getIsRevenue } from 'src/standby/analytics/isRevenueSelector';
import { selectStandbyPageMktgSelector } from 'src/standby/analytics/selectStandbyPageMktgSelector';

const { STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT_SUCCESS, STANDBY__SAVE_IS_REVENUE } = StandbyActionTypes;

const standbySelectors = {
  isRevenue: {
    actions: [STANDBY__SAVE_IS_REVENUE],
    selector: getIsRevenue
  }
};

export const generateStandbyStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(standbySelectors, state, actionType);

export const analyticsActionsForStandbyStore = generateFlowActionListForAnalytics(standbySelectors);

export const dataLayerSelectorsForStandbyList = {
  [STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT_SUCCESS]: selectStandbyPageMktgSelector
};
