// @flow
import _ from 'lodash';
import { forceRedirectHelper } from 'src/shared/helpers/interceptorHelpers';
import { isRefresh } from 'src/shared/routeUtils/routeStateHelper';

const upcomingTripDetailsInterceptor = (interceptorContext: InterceptorContext) => {
  const { history, store, action } = interceptorContext;

  if (isRefresh(_.get(action, 'payload.routeState'))) {
    return {
      interceptor() {
        const forceRedirect = forceRedirectHelper(store, history);

        return forceRedirect('/my-account/upcoming-trips');
      },
      ...interceptorContext
    };
  }
};

export default upcomingTripDetailsInterceptor;
