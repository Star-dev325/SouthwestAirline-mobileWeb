// @flow
import _ from 'lodash';
import * as HistoryActions from 'src/shared/actions/historyActions';
import { initialRouteIndex } from 'src/shared/constants/routeFlow';
import { get, isObject } from 'src/shared/helpers/jsUtils';
import { transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import { isBrowserBackOrForward, isRefresh } from 'src/shared/routeUtils/routeStateHelper';

const homeRoutePath = '/';

const forceRedirect = (dispatch, routeName) => {
  dispatch(HistoryActions.addHistoryForceRedirect(routeName));

  return routeName;
};

const transition = (transitionTo, routeName) => transitionTo(routeName);

const viewCarReservationDetailsInterceptor = (interceptorContext: InterceptorContext): InterceptorContext => {
  const { store, flowConfig, history, action } = interceptorContext;
  const state = store.getState();
  const carCanceled = get(state, 'app.viewReservation.carCanceled');
  const carReservation = get(state, 'app.viewReservation.carReservation');
  const currentState = action?.payload?.location || action?.payload?.routeState;
  const { searchToken } = transformSearchToQuery(currentState?.search);

  const callForceRedirectAction = _.partial(forceRedirect, store.dispatch);
  const callTransition = _.partial(transition, history.push);
  const redirect = _.flowRight(callTransition, callForceRedirectAction);
  const entryRouteName = flowConfig && flowConfig.entry;
  let redirectPath = '/';

  if (entryRouteName) {
    redirectPath = isObject(entryRouteName) ?
      entryRouteName?.canonicalPath ?? entryRouteName[Object.keys(entryRouteName)[initialRouteIndex]]
      : entryRouteName;
  }

  if (carCanceled) {
    return {
      interceptor() {
        return redirect(homeRoutePath);
      },
      ...interceptorContext
    };
  }

  if (!searchToken && isRefresh(currentState)) {
    return {
      interceptor() {
        return redirect(redirectPath);
      },
      ...interceptorContext
    };
  }

  if (!searchToken && isBrowserBackOrForward(currentState) && _.isEmpty(carReservation)) {
    return {
      interceptor() {
        return redirect(redirectPath);
      },
      ...interceptorContext
    };
  }

  return interceptorContext;
};

export default viewCarReservationDetailsInterceptor;
