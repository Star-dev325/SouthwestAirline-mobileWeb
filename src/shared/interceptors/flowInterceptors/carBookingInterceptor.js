import _ from 'lodash';
import carBookingSearchInterceptor from 'src/shared/interceptors/carBookingSearchInterceptor';
import cleanFlowWhenHasQueryFlagInterceptor from 'src/shared/interceptors/cleanFlowWhenHasQueryFlagInterceptor';
import redirectFlowInterceptor from 'src/shared/interceptors/redirectFlowInterceptor';
import routeFlowConfigGetter from 'src/shared/interceptors/routeFlowConfigGetter';

const config = {
  name: 'carBooking',
  path: '/car/booking',
  pages: {
    carBookingSearchPage: '/car/booking'
  }
};

const interceptor = (interceptorContext) => {
  const { store } = interceptorContext;
  const flowConfig = _.get(routeFlowConfigGetter(store), `${config.name}.flowConfig`, {});

  return _.someExecute([
    carBookingSearchInterceptor(config.pages.carBookingSearchPage),
    cleanFlowWhenHasQueryFlagInterceptor,
    redirectFlowInterceptor
  ])({ ...interceptorContext, flowConfig });
};

export default {
  ...config,
  interceptor
};
