// @flow
import _ from 'lodash';
import {
  isPushReplaceOrRefresh,
  getCurrentRouteState,
  isBrowserBackOrForward,
  shouldCleanFlow,
  isPopupOpen
} from 'src/shared/routeUtils/routeStateHelper';

const checkFlowStatus = ({ store, flowCleaner }) => {
  const currentState = getCurrentRouteState(store.getState().persistentHistory);

  return _.every([
    _.isFunction(flowCleaner),
    isPushReplaceOrRefresh(currentState),
    !isBrowserBackOrForward(currentState),
    shouldCleanFlow(currentState),
    !isPopupOpen(currentState)
  ]);
};

const lookUpTravelFundsPageInterceptor = (interceptorContext: InterceptorContext) => {
  const { store } = interceptorContext;
  const flowCleaner = _.get(interceptorContext, 'flowConfig.flowCleaner');

  return (
    checkFlowStatus({ store, flowCleaner }) && {
      interceptor() {
        flowCleaner();
      },
      ...interceptorContext
    }
  );
};

export default lookUpTravelFundsPageInterceptor;
