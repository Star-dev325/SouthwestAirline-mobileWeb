// @flow
import _ from 'lodash';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import { STATUS } from 'src/shared/constants/flowConstants';
import { ROUTES } from 'src/shared/constants/webViewConstants';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { isOnWebViewLandingPage } from 'src/shared/helpers/webViewHelper';
import { getCurrentRouteState, getPrevRouteState, hasAllInState, isPushReplaceOrRefresh } from 'src/shared/routeUtils/routeStateHelper';
import { getUpgradedBoardingReservation } from 'src/upgradedBoarding/actions/upgradedBoardingActions';

const upgradedBoardingPurchasePageInterceptor =
  (landingPagePath: string) => (interceptorContext: InterceptorContext) => {
    const { store } = interceptorContext;
    const { persistentHistory } = _.cloneDeep(store.getState());
    const { state } = getCurrentRouteState(persistentHistory) || {};
    const isOnPage = isOnWebViewLandingPage(persistentHistory, landingPagePath);
    const hasState = hasAllInState(state, ['body', 'href', 'method']);

    const currentState = getCurrentRouteState(persistentHistory);
    const previousState = getPrevRouteState(persistentHistory);

    const currentPathName = _.get(currentState, 'pathname');
    const previousPathName = _.get(previousState, 'pathname');

    const isOnUpgradedBoardingPage = currentPathName === getNormalizedRoute({ routeName: 'upgradedBoardingPurchase' });
    const isFromBlankPage = previousPathName === ROUTES.BLANK;
    const isFromConfirmationPage = previousPathName === getNormalizedRoute({ routeName: 'confirmation' });

    if (isOnUpgradedBoardingPage && isFromBlankPage && isPushReplaceOrRefresh(currentState)) {
      store.dispatch(FlowStatusActions.setFlowStatus('upgradedBoarding', STATUS.IN_PROGRESS));
    }

    if (isOnUpgradedBoardingPage && isFromConfirmationPage) {
      store.dispatch(FlowStatusActions.setFlowStatus('upgradedBoarding', STATUS.INITIAL));
    }

    if (isOnPage && hasState) {
      return {
        interceptor: () => {
          store.dispatch(getUpgradedBoardingReservation(state, false));
        },
        ...interceptorContext
      };
    }
  };

export default upgradedBoardingPurchasePageInterceptor;
