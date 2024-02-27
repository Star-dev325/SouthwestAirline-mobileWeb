// @flow
import { push } from 'connected-react-router';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import { getCurrentAppFlow } from 'src/shared/selectors/appSelector';
import * as StandbyApi from 'src/shared/api/standbyApi';
import { STATUS } from 'src/shared/constants/flowConstants';
import SharedConstants from 'src/shared/constants/sharedConstants';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import StandbyActionTypes, { apiActionCreator } from 'src/standby/actions/standbyActionTypes';

import type { ApiErrorType } from 'src/shared/flow-typed/shared.types';
import type { Dispatch as ReduxDispatch } from 'redux';

const { STANDBY__SAVE_IS_REVENUE, STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT } = StandbyActionTypes;

export const shouldRedirectToHomePage = (state: *, error: ApiErrorType) => {
  const pathname = getCurrentAppFlow(state);

  return error?.responseJSON?.code === 400308278 && 
    (pathname === SharedConstants.APP_FLOWS.SAME_DAY || pathname === SharedConstants.APP_FLOWS.STANDBY);
};

const { fetchCheckStandbyNearAirport, fetchCheckStandbyNearAirportSuccess, fetchCheckStandbyNearAirportFailed } =
  apiActionCreator(STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT, { shouldRedirectToHomePage });

export const checkStandbyNearAirport =
  (query: *, shouldPushToStandby: boolean, isRevenue: boolean) => (dispatch: ReduxDispatch<*>) => {
    dispatch(fetchCheckStandbyNearAirport(query));
    dispatch(FlowStatusActions.setFlowStatus('standby', STATUS.INITIAL));

    return StandbyApi.fetchStandbyList(query)
      .then((apiResponse) => {
        dispatch(fetchCheckStandbyNearAirportSuccess(apiResponse));
        dispatch(FlowStatusActions.setFlowStatus('standby', STATUS.IN_PROGRESS));

        if (shouldPushToStandby) {
          dispatch(saveStandbyIsRevenueForAnalytics(isRevenue));
          dispatch(push(buildPathWithParamAndQuery('/standby', null, query)));
        }
      })
      .catch((error) => dispatch(fetchCheckStandbyNearAirportFailed(error)));
  };

export const checkEnhancedStandbyNearAirport =
  (query: *, shouldPushToStandby: boolean, isRevenue: boolean, state: {firstName: string, lastName: string, recordLocator: string}) => (dispatch: ReduxDispatch<*>) => {
    dispatch(fetchCheckStandbyNearAirport(query));
    dispatch(FlowStatusActions.setFlowStatus('standby', STATUS.INITIAL));

    return StandbyApi.fetchEnhancedStandbyList(query)
      .then((apiResponse) => {
        dispatch(fetchCheckStandbyNearAirportSuccess(apiResponse));
        dispatch(FlowStatusActions.setFlowStatus('standby', STATUS.IN_PROGRESS));

        if (shouldPushToStandby) {
          dispatch(saveStandbyIsRevenueForAnalytics(isRevenue));
          dispatch(push(buildPathWithParamAndQuery('/standby', null, query), { ...state }));
        }
      })
      .catch((error) => dispatch(fetchCheckStandbyNearAirportFailed(error)));
  };

const saveStandbyIsRevenueForAnalytics = (isRevenue: boolean) => ({
  type: STANDBY__SAVE_IS_REVENUE,
  isRevenue
});
