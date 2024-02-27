import _ from 'lodash';
import { getCurrentRouteState, getPrevRouteState, isTransitionOrRefresh } from 'src/shared/routeUtils/routeStateHelper';
import { resetFlightStatusFlowData } from 'src/flightStatus/actions/flightStatusSearchActions';

const restartFlightStatusInterceptor = (interceptorContext) => {
  const { store } = interceptorContext;
  const { persistentHistory } = store.getState();
  const currentState = getCurrentRouteState(persistentHistory);
  const prevState = getPrevRouteState(persistentHistory);
  const prevPathname = _.get(prevState, 'pathname') || '';
  const isFromRecentList = prevPathname === '/flight-status/recent';
  const isOpenModalOnTheSamePage = _.get(currentState, 'pathname') === prevPathname;

  if (isTransitionOrRefresh(currentState) && !isFromRecentList && !isOpenModalOnTheSamePage) {
    return {
      interceptor() {
        store.dispatch(resetFlightStatusFlowData());
      },
      ...interceptorContext
    };
  }

  return interceptorContext;
};

export default restartFlightStatusInterceptor;
