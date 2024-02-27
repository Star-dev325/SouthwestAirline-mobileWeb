import _ from 'lodash';
import store2 from 'store2';
import StorageKeys from 'src/shared/helpers/storageKeys';

export function verifyFromPaypal(pathname) {
  const paypalUrlPatterns = [
    '^/air/booking/(review|purchase)(/(paypal|paypal-canceled))?$',
    '^/earlybird/(checkin/[0-9A-Z]{6}/)?(review|purchase)(/(paypal|paypal-canceled))?$',
    '^/air/change/pricing/review(/(paypal|paypal-canceled))?$',
    '^/companion/purchase(/(paypal|paypal-canceled))?$',
    '^/upgraded-boarding/purchase(/(paypal|paypal-canceled))?$'
  ];

  const isFromPaypal = _.some(paypalUrlPatterns, (paypalUrlPattern) => {
    const regex = new RegExp(paypalUrlPattern);

    return regex.test(pathname);
  });

  return isFromPaypal && store2.session.has(StorageKeys.PAYPAL_DATA_KEY);
}
