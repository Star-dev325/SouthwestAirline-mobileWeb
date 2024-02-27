import _ from 'lodash';
import store2 from 'store2';
import { getPrevRouteState, getCurrentRouteState, isComingFromHomePage } from 'src/shared/routeUtils/routeStateHelper';
import StorageKeys from 'src/shared/helpers/storageKeys';

const { PERSISTENT_HISTORY_KEY } = StorageKeys;
const RouterStore = {
  state: {
    lastPopedState: {},
    isBrowserBack: false
  },

  getPrevPath() {
    const pathname = _.get(this.getPrevState(), 'pathname');
    const search = _.get(this.getPrevState(), 'search');

    return search ? `${pathname}${search}` : `${pathname}`;
  },

  getCurrentPath() {
    const pathname = _.get(this.getCurrentState(), 'pathname');
    const search = _.get(this.getCurrentState(), 'search');

    return search ? `${pathname}${search}` : `${pathname}`;
  },

  getPrevState() {
    return getPrevRouteState(store2.session(PERSISTENT_HISTORY_KEY) || []);
  },

  getCurrentState() {
    return getCurrentRouteState(store2.session(PERSISTENT_HISTORY_KEY) || []);
  },

  setIsBrowserBack(isBrowserBack) {
    this.state.isBrowserBack = isBrowserBack;
  },

  setLastPopedState(routeState) {
    this.state.lastPopedState = routeState;
  },

  getLastPopedState() {
    return this.state.lastPopedState;
  },

  getIsBrowserBack() {
    return this.state.isBrowserBack;
  },

  isComingFromHomePage() {
    return isComingFromHomePage(store2.session(PERSISTENT_HISTORY_KEY) || []);
  }
};

export default RouterStore;
