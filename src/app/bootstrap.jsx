import React from 'react';
import ReactDOM from 'react-dom';
import branch from 'branch-sdk';

import routes from 'src/app/routes';
import BrowserObject from 'src/shared/helpers/browserObject';
import { history } from 'src/appHistory';
import { Provider } from 'react-redux';
import { store } from 'src/shared/redux/createStore';
import ConnectedHistory from 'src/app/components/connectedHistory';
import * as LocalStorageCache from 'src/shared/cache/localStorageCache';
import appConfig from 'src/shared/config/appConfig';
import { branchListenerHelper } from 'src/app/helpers/bootstrapHelper';
import i18n from '@swa-ui/locale';

const { window } = BrowserObject;

export default function (rootNode) {
  branch.init(appConfig.BRANCH_KEY);
  LocalStorageCache.validateAppVersion();

  branch.addListener(branchListenerHelper(store));

  try {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedHistory history={history}>{routes}</ConnectedHistory>
      </Provider>,
      rootNode
    );
  } catch (err) {
    console.warn(err); // eslint-disable-line no-console
    window.alert(i18n('SHARED__ERROR_MESSAGES__RENDER_ERROR'));
    location.reload();
  }
}
