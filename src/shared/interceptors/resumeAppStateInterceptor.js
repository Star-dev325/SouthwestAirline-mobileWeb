// @flow
import store2 from 'store2';

import { isMatchPath } from 'src/shared/helpers/interceptorHelpers';
import { saveAppState } from 'src/shared/actions/sharedActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';

import { STATUS } from 'src/shared/constants/flowConstants';
import StorageKeys from 'src/shared/helpers/storageKeys';

export default (interceptorContext: InterceptorContext) => {
  const { store, action, flowConfig } = interceptorContext;
  const { name } = flowConfig || {};

  const { app, pathname } = store2.session.get(StorageKeys.APP_STATE_KEY) || {};
  const matchesPath = isMatchPath(pathname)({ action });

  if (pathname && matchesPath) {
    return {
      interceptor() {
        store.dispatch(saveAppState({ app }));
        store.dispatch(FlowStatusActions.setFlowStatus(name, STATUS.IN_PROGRESS));
      },
      ...interceptorContext
    };
  }
};
