// @flow
import store2 from 'store2';

import { isMatchPath, isRouteChange } from 'src/shared/helpers/interceptorHelpers';
import StorageKeys from 'src/shared/helpers/storageKeys';
import SharedConstants from 'src/shared/constants/sharedConstants';

const { CHASE, EXTERNAL_PAYMENT } = SharedConstants.EXTERNAL_TARGETS;

export default (interceptorContext: InterceptorContext) => {
  const { action } = interceptorContext;

  if (isRouteChange({ action })) {
    const { pathname, target } = store2.session.get(StorageKeys.APP_STATE_KEY) || {};

    const isStoredPath = isMatchPath(pathname)({ action });
    const isChaseApplyPath = target === CHASE && isMatchPath('/chase/offer/apply')({ action });
    const isExternalPaymentPath = target === EXTERNAL_PAYMENT && isMatchPath('payment/external')({ action });

    const isValidPath = isStoredPath || isChaseApplyPath || isExternalPaymentPath;

    if (!pathname || !isValidPath) {
      store2.session.remove(StorageKeys.APP_STATE_KEY);
    }
  }
};
