import _ from 'lodash';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import cleanFlowInterceptor from 'src/shared/interceptors/cleanFlowInterceptor';
import payPalResumeInterceptor from 'src/shared/interceptors/payPalResumeInterceptor';
import redirectFlowInterceptor from 'src/shared/interceptors/redirectFlowInterceptor';
import routeFlowConfigGetter from 'src/shared/interceptors/routeFlowConfigGetter';
import upgradedBoardingCancelReservationInterceptor from 'src/shared/interceptors/upgradedBoardingCancelReservationInterceptor';
import upgradedBoardingPurchasePageInterceptor from 'src/shared/interceptors/upgradedBoardingPurchasePageInterceptor';

const config = {
  name: 'upgradedBoarding',
  path: '/upgraded-boarding',
  pages: {
    purchase: '/upgraded-boarding/purchase',
    payment: '/upgraded-boarding/payment',
    confirmation: '/upgraded-boarding/confirmation',
    purchaseFromPayPalPage: '^/upgraded-boarding/purchase/(paypal|paypal-canceled)?$'
  }
};

const interceptor = (interceptorContext) => {
  const { store } = interceptorContext;
  const flowConfig = _.get(routeFlowConfigGetter(store), `${config.name}.flowConfig`, {});

  config.pages.purchase = getNormalizedRoute({ routeName: 'upgradedBoardingPurchase' });
  config.pages.confirmation = getNormalizedRoute({ routeName: 'confirmation' });

  return _.someExecute([
    payPalResumeInterceptor(config.pages.purchaseFromPayPalPage),
    upgradedBoardingCancelReservationInterceptor(
      [config.pages.purchase, config.pages.payment, config.pages.confirmation],
      config.pages.purchase
    ),
    upgradedBoardingPurchasePageInterceptor(config.pages.purchase),
    cleanFlowInterceptor,
    redirectFlowInterceptor
  ])({ ...interceptorContext, flowConfig });
};

export default {
  ...config,
  interceptor
};
