// @flow
import _ from 'lodash';
import { transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { hasAllInState, isRefresh } from 'src/shared/routeUtils/routeStateHelper';

const travelInformationPageInterceptor =
  (shouldCheckState: boolean) =>
    (interceptorContext: InterceptorContext): InterceptorContext => {
      const { store, action, history } = interceptorContext;
      const currentState = action.payload.routeState || action.payload.location;

      const state = _.get(currentState, 'state');
      const isInvalidState = shouldCheckState && !hasAllInState(state, ['firstName', 'lastName']);
      const { searchToken } = transformSearchToQuery(currentState?.search);

      if (!searchToken && (isRefresh(currentState) || isInvalidState)) {
        return {
          interceptor() {
            const isLoggedIn = _.get(store.getState(), 'app.account.isLoggedIn');

            return isLoggedIn ? history.replace('/my-account/upcoming-trips') : history.replace(getNormalizedRoute({ routeName: 'index' }));
          },
          ...interceptorContext
        };
      }

      return interceptorContext;
    };

export default travelInformationPageInterceptor;
