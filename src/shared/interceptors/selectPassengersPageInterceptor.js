// @flow
import { AIR_CHANGE_SPLIT_PNR_FLOW_NAME } from 'src/airChange/constants/airChangeConstants';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import { STATUS } from 'src/shared/constants/flowConstants';
import { cloneDeep, get } from 'src/shared/helpers/jsUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';

const selectPassengersPageInterceptor =
  (selectPassengersPagePath: string) => (interceptorContext: InterceptorContext) => {
    const { store, history } = interceptorContext;
    const { persistentHistory } = cloneDeep(store.getState());
    const currentState = getCurrentRouteState(persistentHistory);
    const currentPathName = get(currentState, 'pathname');
    const airChangeSplitPnrFlowStatus = get(store.getState(), `app.flowStatus.${AIR_CHANGE_SPLIT_PNR_FLOW_NAME}`);
    const backFromPath = get(currentState, 'backFrom.pathname');
    const isBackFromSelectFlightPage = backFromPath === getNormalizedRoute({ routeName: 'view' });
    const isOnSelectPassengersPage = currentPathName === selectPassengersPagePath;

    if ((airChangeSplitPnrFlowStatus === STATUS.COMPLETED && isBackFromSelectFlightPage && isOnSelectPassengersPage) || (!airChangeSplitPnrFlowStatus && isOnSelectPassengersPage)) {
      return {
        interceptor() {
          history.push(getNormalizedRoute({ routeName: 'viewReservationIndex' }));
          store.dispatch(FlowStatusActions.clearFlowStatus(AIR_CHANGE_SPLIT_PNR_FLOW_NAME));
        },
        ...interceptorContext
      };
    }
  };

export default selectPassengersPageInterceptor;
