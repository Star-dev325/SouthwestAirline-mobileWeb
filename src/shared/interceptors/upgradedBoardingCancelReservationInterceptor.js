// @flow
import _ from 'lodash';
import { matchPath } from 'react-router';
import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';
import { cancelUpgradedBoardingReservation } from 'src/upgradedBoarding/actions/upgradedBoardingActions';

const upgradedBoardingCancelReservationInterceptor =
  (excludedMatchToPaths: Array<string>, prevPathToMatch: string) => (interceptorContext: InterceptorContext) => {
    const { store } = interceptorContext;
    const state = _.cloneDeep(store.getState());
    const { persistentHistory } = state;
    const currentState = getCurrentRouteState(persistentHistory);
    const currentPathname = _.get(currentState, 'pathname');
    const backFrom = _.get(currentState, 'backFrom.pathname');
    const matchesExcludedPath = _.some(excludedMatchToPaths, (path) =>
      matchPath(currentPathname, { path, exact: false })
    );
    const matchesBackFromPath = matchPath(backFrom, { path: prevPathToMatch, exact: false });
    const UPGRADED_BOARDING = _.get(state, 'app.toggles.UPGRADED_BOARDING', false);
    const cancelLink = _.get(
      state,
      'app.upgradedBoarding.upgradedBoardingPage.upgradedBoardingResponse.upgradedBoardingSelectPage._links.upgradedBoardingCancel'
    );

    if (UPGRADED_BOARDING && !matchesExcludedPath && matchesBackFromPath && cancelLink) {
      return {
        interceptor() {
          store
            .dispatch(cancelUpgradedBoardingReservation(cancelLink))
            .catch(_.noop);
        },
        ...interceptorContext
      };
    }
  };

export default upgradedBoardingCancelReservationInterceptor;
