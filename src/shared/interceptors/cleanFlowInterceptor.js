import _ from 'lodash';
import {
  isTransitionOrRefresh,
  isNotInUrlRange,
  isOnEntryRoute,
  getCurrentRouteState,
  getPrevRouteState
} from 'src/shared/routeUtils/routeStateHelper';

const _shouldCleanFlow = ({ store, flowConfig }) => {
  if (_.isEmpty(flowConfig)) return false;

  const { entry: entryRouteName, flowCleaner, flowUrlRange } = flowConfig;
  const { persistentHistory } = store.getState();

  const currentState = getCurrentRouteState(persistentHistory);
  const prevState = getPrevRouteState(persistentHistory) || {};
  const currentRouteName = currentState.pathname;
  const prevPath = prevState.pathname;

  return _.every([
    _.isFunction(flowCleaner),
    isOnEntryRoute(currentRouteName, entryRouteName),
    isTransitionOrRefresh(currentState),
    isNotInUrlRange(flowUrlRange, prevPath)
  ]);
};

const cleanFlowInterceptor = (interceptorContext) => {
  const { store, flowConfig } = interceptorContext;

  return (
    _shouldCleanFlow({ store, flowConfig }) && {
      interceptor() {
        flowConfig.flowCleaner();
      },
      ...interceptorContext
    }
  );
};

export default cleanFlowInterceptor;
