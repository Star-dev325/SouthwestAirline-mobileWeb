import _ from 'lodash';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import cleanFlowInterceptor from 'src/shared/interceptors/cleanFlowInterceptor';
import payPalResumeInterceptor from 'src/shared/interceptors/payPalResumeInterceptor';
import redirectFlowInterceptor from 'src/shared/interceptors/redirectFlowInterceptor';
import routeFlowConfigGetter from 'src/shared/interceptors/routeFlowConfigGetter';
import selectPassengersPageInterceptor from 'src/shared/interceptors/selectPassengersPageInterceptor';

const config = {
  name: 'airChange',
  path: '/air/change',
  pages: {
    changePurchaseReviewFromPayPalPage: '^/air/change/(pricing/review|reconcile)(/(paypal|paypal-canceled))?$',
    selectPassengersPage: '/air/change/select-passengers'
  }
};

const interceptor = (interceptorContext) => {
  const { store } = interceptorContext;
  const flowConfig = _.get(routeFlowConfigGetter(store), `${config.name}.flowConfig`, {});

  config.path = getNormalizedRoute({ routeName: 'view' });
  config.pages.selectPassengersPage = getNormalizedRoute({ routeName: 'selectPassengers' });

  return _.someExecute([
    payPalResumeInterceptor(config.pages.changePurchaseReviewFromPayPalPage),
    selectPassengersPageInterceptor(config.pages.selectPassengersPage),
    cleanFlowInterceptor,
    redirectFlowInterceptor
  ])({ ...interceptorContext, flowConfig });
};

export default {
  ...config,
  interceptor
};
