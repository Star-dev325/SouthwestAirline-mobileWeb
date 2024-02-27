import _ from 'lodash';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import airCancelConfirmationInterceptor from 'src/shared/interceptors/airCancelConfirmationInterceptor';
import airCancelSelectPassengersPageInterceptor from 'src/shared/interceptors/airCancelSelectPassengersPageInterceptor';
import redirectFlowInterceptor from 'src/shared/interceptors/redirectFlowInterceptor';
import routeFlowConfigGetter from 'src/shared/interceptors/routeFlowConfigGetter';

const config = {
  name: 'airCancel',
  pages: {
    checkInConfirmationPage: '/air/cancel/:recordLocator/refund-summary',
    selectPassengersPage: '/air/cancel/select-passengers'
  },
  path: '/air/cancel'
};

const interceptor = (interceptorContext) => {
  const { store } = interceptorContext;
  const flowConfig = _.get(routeFlowConfigGetter(store), `${config.name}.flowConfig`, {});

  return _.someExecute([
    airCancelConfirmationInterceptor(getNormalizedRoute({ routeName: 'refundSummary' })),
    airCancelSelectPassengersPageInterceptor(getNormalizedRoute({ routeName: 'selectPassengers' })),
    redirectFlowInterceptor
  ])({ ...interceptorContext, flowConfig });
};

export default {
  ...config,
  interceptor
};
