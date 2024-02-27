// @flow
import _ from 'lodash';
import store2 from 'store2';

import { isMatchPath } from 'src/shared/helpers/interceptorHelpers';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';

import { STATUS } from 'src/shared/constants/flowConstants';
import StorageKeys from 'src/shared/helpers/storageKeys';

const payPalResumeInterceptor = (matchPathRegExp: string) => (interceptorContext: InterceptorContext) => {
  const { store, action, flowConfig } = interceptorContext;
  const flowName = _.get(flowConfig, 'name');
  const isPayPalResumePath = isMatchPath(matchPathRegExp)({ action });

  const hasMoreThanOneHistory = _.get(store.getState(), 'persistentHistory', []).length > 1;

  const isFromPayPal = isPayPalResumePath && hasMoreThanOneHistory;

  if (isFromPayPal && store2.session.has(StorageKeys.PAYPAL_DATA_KEY) && flowName) {
    return {
      interceptor() {
        store.dispatch(FlowStatusActions.setFlowStatus(flowName, STATUS.IN_PROGRESS));
      },
      ...interceptorContext
    };
  }
};

export default payPalResumeInterceptor;
