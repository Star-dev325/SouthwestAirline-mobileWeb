// @flow
import { matchPath } from 'react-router';
import { initialRouteIndex } from 'src/shared/constants/routeFlow';
import { get, isObject } from 'src/shared/helpers/jsUtils';
import { transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';
import { forceRedirectHelper } from 'src/shared/helpers/interceptorHelpers';

const airCancelConfirmationInterceptor = (confirmationPagePath: string) => (interceptorContext: InterceptorContext) => {
  const { flowConfig, history, store } = interceptorContext;

  const { persistentHistory } = store.getState();
  const currentState = getCurrentRouteState(persistentHistory);
  const currentPath = get(currentState, 'pathname');
  const backFromPath = get(currentState, 'backFrom.pathname');
  const isBackFromCheckInConfirmationPage = matchPath(backFromPath, { path: getNormalizedRoute({ routeName: 'checkInConfirmation' }), exact: true });
  const isOnConfirmationPage = matchPath(currentPath, { path: confirmationPagePath, exact: true });
  const flowStatus = flowConfig && flowConfig.flowStatusGetter && flowConfig.flowStatusGetter();
  const entryRouteName = flowConfig && flowConfig.entry;
  const { searchToken } = transformSearchToQuery(currentState?.search);

  let redirectPath = '/';

  if (entryRouteName) {
    redirectPath = isObject(entryRouteName) ?
      entryRouteName?.canonicalPath ?? entryRouteName[Object.keys(entryRouteName)[initialRouteIndex]]
      : entryRouteName;
  }

  if (!searchToken && isOnConfirmationPage) {
    if (isBackFromCheckInConfirmationPage) {
      return {
        interceptor() {
          const forceRedirect = forceRedirectHelper(store, history);

          return forceRedirect('/');
        },
        ...interceptorContext
      };
    } else if (!flowStatus) {
      return {
        interceptor() {
          const forceRedirect = forceRedirectHelper(store, history);

          return forceRedirect(redirectPath);
        },
        ...interceptorContext
      };
    }
  } else if (searchToken && isOnConfirmationPage && !flowStatus) {
    return {
      interceptor() {
        const forceRedirect = forceRedirectHelper(store, history);

        return forceRedirect(redirectPath);
      },
      ...interceptorContext
    };
  }
};

export default airCancelConfirmationInterceptor;
