// @flow
import { matchPath } from 'react-router';
import { AIR_CANCEL_SPLIT_PNR_FLOW_NAME } from 'src/airCancel/constants/airCancelConstants';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import { STATUS } from 'src/shared/constants/flowConstants';
import { transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';

const airCancelSelectPassengersPageInterceptor =
  (airCancelSelectPassengersPagePath: string) => (interceptorContext: InterceptorContext) => {
    const { store, history } = interceptorContext;
    const state = store.getState();
    const airCancelSplitPnrFlowStatus = state?.app?.flowStatus[AIR_CANCEL_SPLIT_PNR_FLOW_NAME];
    const { persistentHistory } = state;
    const { backFrom: { pathname: backFromPath } = {}, pathname: currentPathName } =
      getCurrentRouteState(persistentHistory);
    const isBackFromReviewFlightPage = matchPath(backFromPath, { path: getNormalizedRoute({ routeName: 'airCancelRefundQuote' }), exact: true });
    const isBackFromSelectFlightPage = matchPath(backFromPath, {
      path: getNormalizedRoute({ routeName: 'selectBound' }),
      exact: true
    });
    const isOnAirCancelSelectPassengersPage = currentPathName === airCancelSelectPassengersPagePath;
    const { searchToken } = transformSearchToQuery(currentPathName?.search);

    if (
      airCancelSplitPnrFlowStatus === STATUS.COMPLETED &&
      (isBackFromSelectFlightPage || isBackFromReviewFlightPage) &&
      isOnAirCancelSelectPassengersPage &&
      !searchToken
    ) {
      return {
        interceptor() {
          history.push(getNormalizedRoute({ routeName: 'viewReservationIndex' }));
          store.dispatch(FlowStatusActions.clearFlowStatus(AIR_CANCEL_SPLIT_PNR_FLOW_NAME));
        },
        ...interceptorContext
      };
    }
  };

export default airCancelSelectPassengersPageInterceptor;
