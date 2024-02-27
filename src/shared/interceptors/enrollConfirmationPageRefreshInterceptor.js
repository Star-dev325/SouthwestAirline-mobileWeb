// @flow
import _ from 'lodash';
import { isRefresh, getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';
import * as HistoryActions from 'src/shared/actions/historyActions';

const forceRedirect = (dispatch, routeName) => {
  dispatch(HistoryActions.addHistoryForceRedirect(routeName));

  return routeName;
};

const transition = (transitionTo, routeName) => transitionTo(routeName);

const enrollConfirmationPageRefreshInterceptor = (matchPath: string) => (interceptorContext: InterceptorContext) => {
  const { store, flowConfig, history } = interceptorContext;

  const { persistentHistory } = store.getState();
  const currentState = getCurrentRouteState(persistentHistory);

  const callForceRedirectAction = _.partial(forceRedirect, store.dispatch);
  const callTransition = _.partial(transition, history.push);
  const redirect = _.flowRight(callTransition, callForceRedirectAction);

  if (_.get(currentState, 'pathname', '') === matchPath && isRefresh(currentState)) {
    return {
      interceptor() {
        return redirect(_.get(flowConfig, 'entry'));
      },
      ...interceptorContext
    };
  }
};

export default enrollConfirmationPageRefreshInterceptor;
