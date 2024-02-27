// @flow
import _ from 'lodash';
import React from 'react';
import { addEventListenerOnce } from 'src/shared/helpers/eventHelpers';
import { history } from 'src/appHistory';
import BrowserObject from 'src/shared/helpers/browserObject';
import DeviceInfo from 'src/shared/helpers/deviceInfo';
import { transformToHttpRequestError } from 'src/shared/transformers/httpErrorTransformer';

import DialogActionTypes from 'src/shared/actions/dialogActionTypes';
import type { DialogOptionsType } from 'src/shared/flow-typed/dialog.types';
import type { Dispatch as ReduxDispatch } from 'redux';

const { window } = BrowserObject;
const { browser, os } = DeviceInfo;

export const showDialog =
  (options: DialogOptionsType) =>
    (dispatch: ReduxDispatch<*>): Promise<*> =>
      new Promise((resolve: *) => {
        if (!_isHistoryContainPopupState()) {
          addEventListenerOnce(window, 'popstate', (event: *) => {
            if (!_.get(event.state, 'popup')) {
              dispatch(toggleDialog(false));
            }
            resolve();
          });
          !_isChromeOnIOS() &&
          history.push({
            pathname: history.location.pathname,
            search: history.location.search,
            state: _.merge({ popup: 'open' }, history.location.state)
          });
        }

        const { error } = options;

        if (error) {
          const httpError = transformToHttpRequestError(error);
          const { requestId, code, $customized, message } = httpError;

          if (!$customized) {
            options.title = message;
          }

          if (!$customized && httpError && requestId && code) {
            options.contentView = (
              <div>
                <p>{`Error ${code}`}</p>
                <p>{`(${requestId})`}</p>
              </div>
            );
          } else if (!$customized && httpError && code) {
            options.contentView = (
              <div>
                <p>{`Error ${code}`}</p>
              </div>
            );
          }
        }

        dispatch(toggleDialog(true, options));
        resolve();
      });

export const hideDialog =
  () =>
    (dispatch: ReduxDispatch<*>): Promise<*> =>
      new Promise((resolve: *) => {
        dispatch(toggleDialog(false));

        if (_isHistoryContainPopupState()) {
          addEventListenerOnce(window, 'popstate', () => {
            resolve();
          });
          history.goBack();
        } else {
          resolve();
        }
      });

export const forceHideDialog =
  () =>
    (dispatch: ReduxDispatch<*>): Promise<*> =>
      new Promise((resolve: *) => {
        dispatch(toggleDialog(false));
        resolve();
      });

export const toggleDialog = (isShowDialog: boolean, options?: DialogOptionsType) => ({
  type: DialogActionTypes.TOGGLE_DIALOG,
  isShowDialog,
  options
});

const _isHistoryContainPopupState = () => history.action === 'PUSH' && !!_.get(history.location.state, 'popup');

const _isChromeOnIOS = () =>
  // Add this to fix MOB-4934, the defect on Chrome for iOS.
  browser.name === 'Chrome' && os.name === 'iOS';
