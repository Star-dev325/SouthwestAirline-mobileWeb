// @flow
import _ from 'lodash';
import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';
import { getUpgradeFareReservation } from 'src/airUpgrade/actions/airUpgradeActions';
import { exitWebView } from 'src/shared/actions/webViewActions';
import { isOnWebViewLandingPage } from 'src/shared/helpers/webViewHelper';

const airUpgradeSelectBoundsInterceptor =
  (airUpgradeSelectBoundsPath: string) => (interceptorContext: InterceptorContext) => {
    const { store } = interceptorContext;
    const state = _.cloneDeep(store.getState());

    const persistentHistory = _.get(state, 'persistentHistory');
    const currentState = getCurrentRouteState(persistentHistory);
    const searchRequest = _.get(currentState, 'state');
    const isOnPage = isOnWebViewLandingPage(persistentHistory, airUpgradeSelectBoundsPath);

    if (isOnPage) {
      return {
        interceptor() {
          const errorHandler = () => store.dispatch(exitWebView());

          store.dispatch(getUpgradeFareReservation({ recordLocator: '', link: searchRequest }, false, errorHandler));
        },
        ...interceptorContext
      };
    }
  };

export default airUpgradeSelectBoundsInterceptor;
