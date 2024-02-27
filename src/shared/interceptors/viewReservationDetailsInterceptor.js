// @flow
import _ from 'lodash';
import { transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { hasAllInState } from 'src/shared/routeUtils/routeStateHelper';

const viewReservationDetailsInterceptor = (interceptorContext: InterceptorContext): InterceptorContext => {
  const { action, history } = interceptorContext;
  const currentState = action.payload.location || action.payload.routeState;
  const state = _.get(currentState, 'state');
  const { searchToken } = transformSearchToQuery(currentState?.search);

  if (!searchToken && !hasAllInState(state, ['firstName', 'lastName'])) {
    return {
      interceptor() {
        history.replace(getNormalizedRoute({ routeName: 'index' }));
      },
      ...interceptorContext
    };
  }

  return interceptorContext;
};

export default viewReservationDetailsInterceptor;
