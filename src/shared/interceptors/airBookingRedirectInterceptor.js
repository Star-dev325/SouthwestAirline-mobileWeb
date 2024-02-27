// @flow
import _ from 'lodash';
import { isMatchPath } from 'src/shared/helpers/interceptorHelpers';
import { isIndexPage } from 'src/shared/helpers/webViewHelper';
import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';

const airBookingRedirectInterceptor = (landingPagePath: string) => (interceptorContext: InterceptorContext) => {
  const { history, store } = interceptorContext;
  const { persistentHistory } = _.cloneDeep(store.getState());
  const currentState = getCurrentRouteState(persistentHistory);
  const currentPathName = currentState?.pathname;
  const pathThatRequiresRedirect = '/air/booking(/)?$';
  const shouldRedirectToLandingPage = isMatchPath(pathThatRequiresRedirect)({ ...interceptorContext });
  const isIndexLandingPage = isIndexPage(landingPagePath, currentPathName);

  if (shouldRedirectToLandingPage && !isIndexLandingPage) {
    return {
      interceptor() {
        history.replace(landingPagePath);
      },
      ...interceptorContext
    };
  }
};

export default airBookingRedirectInterceptor;
