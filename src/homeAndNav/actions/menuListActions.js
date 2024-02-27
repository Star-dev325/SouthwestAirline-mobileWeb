// @flow
import { toggleDrawer } from 'src/homeAndNav/actions/drawerActions';
import homeAndNavActionTypes, { apiActionCreator } from 'src/homeAndNav/actions/homeAndNavActionTypes';
import browser from 'src/shared/helpers/browserObject';
import { get } from 'src/shared/helpers/jsUtils';

import type { Dispatch as ReduxDispatch } from 'redux';

const { HOME_NAV__NAVIGATE_TO_EMAIL_US, HOME_NAV__UPDATE_ACTIVE_LINK_INDEX } = homeAndNavActionTypes;

export const updateActiveLinkIndex = (index: number) => ({
  payload: index,
  type: HOME_NAV__UPDATE_ACTIVE_LINK_INDEX
});

const _navigateTo = (target: string) => {
  browser.window.open(target, '_blank');
};

const _removeTrailingSlash = (url: string) => {
  if (url && url.lastIndexOf('/') === url.length - 1) {
    return url.substring(0, url.length - 1);
  }

  return url;
};

const { navigateToEmailUs, navigateToEmailUsSuccess } = apiActionCreator(HOME_NAV__NAVIGATE_TO_EMAIL_US);

export const gotoEmailUsPage = (email360Link: string) => async (dispatch: ReduxDispatch<*>, getState: () => *) => {
  const state = getState();

  dispatch(navigateToEmailUs());

  const guidNumber = get(state, 'app.account.salesforceGuid');
  const link = guidNumber ? `${_removeTrailingSlash(email360Link)}?guid=${guidNumber}` : email360Link;

  _navigateTo(link);

  dispatch(toggleDrawer(true));
  dispatch(navigateToEmailUsSuccess(link));
};