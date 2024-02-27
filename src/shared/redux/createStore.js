import _ from 'lodash';
import thunk from 'redux-thunk';
import store2 from 'store2';
import { history } from 'src/appHistory';
import appReducer from 'src/app/reducers/appReducers';
import { combineReducers, createStore as createReduxStore, applyMiddleware, compose } from 'redux';

import { connectRouter, routerMiddleware } from 'connected-react-router';
import analyticsReducer from 'src/shared/analytics/reducers/analyticsReducer';
import spinnerMiddleware from 'src/shared/redux/middlewares/spinnerMiddleware';
import analyticsMiddleware from 'src/shared/redux/middlewares/analyticsMiddleware';
import webViewMiddleware from 'src/shared/redux/middlewares/webViewMiddleware';
import apiErrorPopupMiddleware from 'src/shared/redux/middlewares/apiErrorPopupMiddleware';
import earlyBirdPricingFetchMiddleware from 'src/shared/redux/middlewares/earlyBirdPricingFetchMiddleware';
import interceptorMiddleware from 'src/shared/redux/middlewares/interceptorMiddleware';
import { persistentHistory } from 'src/shared/reducers/historyReducer';
import StorageKeys from 'src/shared/helpers/storageKeys';
import environment from 'src/shared/api/apiRoutes';

function createStore() {
  let middlewares = [
    thunk,
    earlyBirdPricingFetchMiddleware,
    routerMiddleware(history),
    interceptorMiddleware,
    analyticsMiddleware,
    webViewMiddleware,
    spinnerMiddleware,
    apiErrorPopupMiddleware
  ];
  const reducers = {
    app: appReducer,
    analytics: analyticsReducer
  };

  const reducerFn = combineReducers({
    ...reducers,
    router: connectRouter(history),
    persistentHistory
  });

  let composeEnhancers = compose;

  if (environment.appEnv === 'dev') {
    middlewares = [require('redux-immutable-state-invariant').default(), ...middlewares];

    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }
  const accountInfo = store2.get(StorageKeys.ACCOUNT_INFO);

  const preloadedState = {
    app: {
      account: {
        accountInfo,
        isLoggedIn: !_.isEmpty(accountInfo)
      }
    },
    persistentHistory: store2.session(StorageKeys.PERSISTENT_HISTORY_KEY) || []
  };

  return createReduxStore(reducerFn, preloadedState, composeEnhancers(applyMiddleware(...middlewares)));
}

export const store = createStore();
