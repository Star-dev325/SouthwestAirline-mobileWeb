import _ from 'lodash';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import airUpgradeSelectBoundsInterceptor from 'src/shared/interceptors/airUpgradeSelectBoundsInterceptor';
import payPalResumeInterceptor from 'src/shared/interceptors/payPalResumeInterceptor';

const config = {
  name: 'airUpgrade',
  path: '/air/upgrade',
  pages: {
    airUpgradeSelectBoundsPage: '/air/upgrade/select-bounds',
    upgradePurchaseReviewFromPayPalPage: '^/air/upgrade/purchase(/paypal|/paypal-canceled)?$'
  }
};

const interceptor = (interceptorContext) => {
  config.pages.airUpgradeSelectBoundsPage = getNormalizedRoute({ routeName: 'airUpgradeSelectBound' });

  return _.someExecute([
    airUpgradeSelectBoundsInterceptor(config.pages.airUpgradeSelectBoundsPage),
    payPalResumeInterceptor(config.pages.upgradePurchaseReviewFromPayPalPage)
  ])({
    ...interceptorContext
  });
};

export default {
  ...config,
  interceptor
};
