import _ from 'lodash';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import lookUpTravelFundsPageInterceptor from 'src/shared/interceptors/lookUpTravelFundsPageInterceptor';
import lookUpTravelFundsSearchInterceptor from 'src/shared/interceptors/lookUpTravelFundsSearchInterceptor';
import redirectFlowInterceptor from 'src/shared/interceptors/redirectFlowInterceptor';
import routeFlowConfigGetter from 'src/shared/interceptors/routeFlowConfigGetter';
import transferTravelFundsSearchTokenInterceptor from 'src/shared/interceptors/transferTravelFundsSearchTokenInterceptor';

const config = {
  name: 'lookUpTravelFunds',
  path: '/travel-funds',
  pages: {
    checkTravelFundsLandingPage: '^/travel-funds(/look-up)?$'
  }
};

const interceptor = (interceptorContext) => {
  const { store } = interceptorContext;
  const flowConfig = _.get(routeFlowConfigGetter(store), `${config.name}.flowConfig`, {});

  config.path = getNormalizedRoute({ routeName: 'index' });
  config.pages.checkTravelFundsLandingPage = getNormalizedRoute({ routeName: 'index' });

  return _.someExecute([
    lookUpTravelFundsPageInterceptor,
    lookUpTravelFundsSearchInterceptor(config.pages.checkTravelFundsLandingPage),
    transferTravelFundsSearchTokenInterceptor,
    redirectFlowInterceptor
  ])({ ...interceptorContext, flowConfig });
};

export default {
  ...config,
  interceptor
};
