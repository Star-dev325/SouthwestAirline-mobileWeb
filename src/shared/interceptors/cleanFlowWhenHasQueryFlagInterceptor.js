// @flow
import _ from 'lodash';
import { isBrowserBackOrForward, shouldCleanFlow, getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';

const cleanFlowWhenHasQueryFlagInterceptor = (interceptorContext: InterceptorContext) => {
  const { store } = interceptorContext;
  const { persistentHistory } = store.getState();
  const currentState = getCurrentRouteState(persistentHistory);
  const flowCleaner = _.get(interceptorContext, 'flowConfig.flowCleaner');

  if (flowCleaner && !isBrowserBackOrForward(currentState) && shouldCleanFlow(currentState)) {
    return {
      interceptor() {
        flowCleaner();
      },
      ...interceptorContext
    };
  }
};

export default cleanFlowWhenHasQueryFlagInterceptor;
