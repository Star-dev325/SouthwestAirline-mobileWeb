// @flow
import _ from 'lodash';

import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';
import { retrieveTravelFunds } from 'src/travelFunds/actions/travelFundsActions';
import { isOnWebViewLandingPage } from 'src/shared/helpers/webViewHelper';

const lookUpTravelFundsSearchInterceptor =
  (lookUpTravelFundsPagePath: *) => (interceptorContext: InterceptorContext) => {
    const { store } = interceptorContext;
    const state = _.cloneDeep(store.getState());

    const persistentHistory = _.get(state, 'persistentHistory');
    const currentState = getCurrentRouteState(persistentHistory);
    const searchRequest = _.get(currentState, 'state.checkTravelFunds');
    const flowCleaner = _.get(interceptorContext, 'flowConfig.flowCleaner');

    if (isOnWebViewLandingPage(persistentHistory, lookUpTravelFundsPagePath)) {
      return {
        interceptor() {
          if (_.isEmpty(searchRequest)) {
            flowCleaner();
          } else {
            store.dispatch(retrieveTravelFunds(searchRequest));
          }
        },
        ...interceptorContext
      };
    }
  };

export default lookUpTravelFundsSearchInterceptor;
