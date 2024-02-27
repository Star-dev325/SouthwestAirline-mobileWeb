import _ from 'lodash';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import routeFlowConfigGetter from 'src/shared/interceptors/routeFlowConfigGetter';
import cleanFlowInterceptor from 'src/shared/interceptors/cleanFlowInterceptor';
import redirectFlowInterceptor from 'src/shared/interceptors/redirectFlowInterceptor';
import checkInBoardingPassInterceptor from 'src/shared/interceptors/checkInBoardingPassInterceptor';
import cleanFlowWhenHasQueryFlagInterceptor from 'src/shared/interceptors/cleanFlowWhenHasQueryFlagInterceptor';

const config = {
  name: 'checkIn',
  path: '/check-in',
  normalizedPath: '/air/check-in'
};

const interceptor = (interceptorContext) => {
  const { store } = interceptorContext;
  const flowConfig = _.get(routeFlowConfigGetter(store), `${config.name}.flowConfig`, {});

  return _.someExecute([
    cleanFlowWhenHasQueryFlagInterceptor,
    checkInBoardingPassInterceptor(getNormalizedRoute({ routeName: 'checkInBoardingPass' })),
    cleanFlowInterceptor,
    redirectFlowInterceptor
  ])({ ...interceptorContext, flowConfig });
};

export default {
  ...config,
  interceptor
};
