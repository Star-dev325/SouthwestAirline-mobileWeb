// @flow
import _ from 'lodash';
import { matchPath } from 'react-router';
import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';
import CeptorWrapper from 'src/shared/helpers/ceptorWrapper';

const removeCeptorModalInterceptor = (excludedMatchToPath: string) => (interceptorContext: InterceptorContext) => {
  const { store } = interceptorContext;
  const state = _.cloneDeep(store.getState());

  const { persistentHistory } = state;
  const currentState = getCurrentRouteState(persistentHistory);
  const currentPathname = _.get(currentState, 'pathname');

  const isMatchToExcludedPath = matchPath(currentPathname, { path: excludedMatchToPath, exact: false });

  return {
    interceptor() {
      if (!isMatchToExcludedPath) {
        const removeInfo = _.get(CeptorWrapper.getExtension(), 'removeInfo');

        removeInfo && removeInfo();
      }
    },
    ...interceptorContext
  };
};

export default removeCeptorModalInterceptor;
