// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import store2 from 'store2';

import { getNeededAppState } from 'src/shared/selectors/appSelector';
import StorageKeys from 'src/shared/helpers/storageKeys';
import SharedConstants from 'src/shared/constants/sharedConstants';

import type { Dispatch as ThunkDispatch } from 'src/shared/flow-typed/shared.types';

const { APP_STATE_KEY } = StorageKeys;
const { ANALYTICS_STORES_PATH } = SharedConstants;

type Props = {};

const persistAppState = (target: string) => (dispatch: ThunkDispatch, getState: () => *) => {
  const state = _.cloneDeep(getState());
  const app = getNeededAppState(state);
  const pathname = _.get(state, 'router.location.pathname');

  const analytics = _.get(window, ANALYTICS_STORES_PATH);

  store2.session(APP_STATE_KEY, { app, analytics, pathname, target });
};

export default (Component: *) => {
  const WithAppStateHandler = (props: Props) => {
    const _shouldResumeAppState = (target: string) => {
      const { target: persistedTarget } = store2.session.get(APP_STATE_KEY) || {};

      return target === persistedTarget;
    };

    const _resumeAppState = () => {
      const { analytics } = store2.session.get(APP_STATE_KEY) || {};

      store2.session.remove(APP_STATE_KEY);
      analytics && _.set(window, ANALYTICS_STORES_PATH, analytics);

      return Promise.resolve({});
    };

    return <Component shouldResumeAppStateFn={_shouldResumeAppState} resumeAppStateFn={_resumeAppState} {...props} />;
  };

  const mapDispatchToProps = {
    persistAppStateFn: persistAppState
  };

  return connect(() => ({}), mapDispatchToProps)(WithAppStateHandler);
};
