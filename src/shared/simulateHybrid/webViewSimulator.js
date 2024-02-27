import {
  handleRouteChange as handleRouteChangeFn,
  WEBVIEW_MESSAGE_KEYS
} from '@swa-ui/hybrid';
import { history } from 'src/appHistory';
import { isNotWebView } from 'src/shared/actions/webViewActions';
import { appId } from 'src/shared/constants/webViewConstants';
import browserObject from 'src/shared/helpers/browserObject';
import { store } from 'src/shared/redux/createStore';

const { window: browserWindow } = browserObject;

export const simulateRouteChange = (route, state) => {
  const encodedState = btoa(state);

  browserWindow?.swa?.webViewMessage?.(WEBVIEW_MESSAGE_KEYS.ROUTE_CHANGE, route, encodedState);
};

const exitWebViewFn = (route) => {
  console.log('exitWebView to route: ', route);
  store.dispatch(isNotWebView());
  handleRouteChangeFn(history, appId, route, '');
};

export const addSimulatorInterface = () => {
  browserWindow.SimulatorInterface = {
    exit: exitWebViewFn
  };
};

export const removeSimulatorInterface = () => {
  browserWindow.SimulatorInterface = null;
};

export default {
  addSimulatorInterface,
  removeSimulatorInterface,
  simulateRouteChange
};