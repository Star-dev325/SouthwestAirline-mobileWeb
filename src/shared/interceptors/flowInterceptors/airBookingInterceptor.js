import _ from 'lodash';
import airBookingCorporateRedirectInterceptor from 'src/shared/interceptors/airBookingCorporateRedirectInterceptor';
import airBookingLandingPageInterceptor from 'src/shared/interceptors/airBookingLandingPageInterceptor';
import airBookingRedirectInterceptor from 'src/shared/interceptors/airBookingRedirectInterceptor';
import airBookingSearchInterceptor from 'src/shared/interceptors/airBookingSearchInterceptor';
import cleanFlowInterceptor from 'src/shared/interceptors/cleanFlowInterceptor';
import cleanFlowWhenHasQueryFlagInterceptor from 'src/shared/interceptors/cleanFlowWhenHasQueryFlagInterceptor';
import forceBackToHomeInterceptor from 'src/shared/interceptors/forceBackToHomeInterceptor';
import lowFareCalendarPageInterceptor from 'src/shared/interceptors/lowFareCalendarPageInterceptor';
import payPalResumeInterceptor from 'src/shared/interceptors/payPalResumeInterceptor';
import redirectFlowInterceptor from 'src/shared/interceptors/redirectFlowInterceptor';
import removeCeptorModalInterceptor from 'src/shared/interceptors/removeCeptorModalInterceptor';
import resumeAppStateInterceptor from 'src/shared/interceptors/resumeAppStateInterceptor';
import routeFlowConfigGetter from 'src/shared/interceptors/routeFlowConfigGetter';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

const config = {
  name: 'airBooking',
  path: '/air/booking',
  pages: {
    purchaseReviewFromPayPalPage: '^/air/booking/(review|purchase)(/(paypal|paypal-canceled))?$',
    pricingSummaryPage: '/air/booking/pricing/summary',
    landingPage: '/air/booking/shopping',
    shoppingPage: '/air/booking/shopping/adult/outbound/results',
    paymentEditPage: '/air/booking/payment/edit'
  }
};

const interceptor = (interceptorContext) => {
  const { store } = interceptorContext;
  const flowConfig = _.get(routeFlowConfigGetter(store), `${config.name}.flowConfig`, {});

  config.pages.landingPage = getNormalizedRoute({ routeName: 'index' });
  config.pages.shoppingPage = getNormalizedRoute({ routeName: 'flightShoppingOutbound' });
  config.pages.pricingSummaryPage = getNormalizedRoute({ routeName: 'price' });

  return _.someExecute([
    airBookingRedirectInterceptor(config.pages.landingPage),
    airBookingLandingPageInterceptor(config.pages.landingPage),
    airBookingSearchInterceptor(config.pages.shoppingPage),
    payPalResumeInterceptor(config.pages.purchaseReviewFromPayPalPage),
    resumeAppStateInterceptor,
    lowFareCalendarPageInterceptor,
    cleanFlowWhenHasQueryFlagInterceptor,
    cleanFlowInterceptor,
    redirectFlowInterceptor,
    forceBackToHomeInterceptor,
    airBookingCorporateRedirectInterceptor,
    removeCeptorModalInterceptor(config.pages.paymentEditPage)
  ])({ ...interceptorContext, flowConfig });
};

export default {
  ...config,
  interceptor
};
